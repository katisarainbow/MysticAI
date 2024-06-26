import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) return redirect("/auth-callback?origin=dashboard");

        if (!user.id || !user.email)
            throw new TRPCError({ code: "UNAUTHORIZED" });

        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });

        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                },
            });
        }

        return { success: true };
    }),
    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId, user } = ctx;
        return await db.file.findMany({
            where: {
                userId,
            },
        });
    }),
    deleteFile: privateProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const file = await db.file.findFirst({
                where: {
                    id: input.id,
                    userId,
                },
            });

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            await db.file.delete({
                where: {
                    id: input.id,
                },
            });

            return file;
        }),
    createFile: privateProcedure
        .input(
            z.object({
                title: z.string(),
                name: z.string(),
                color: z.string(),
                type: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const file = await db.file.create({
                data: {
                    title: input.title,
                    name: input.name,
                    color: input.color,
                    type: input.type,
                    question: "",
                    cards: [],
                    uploadStatus: "PROCESSING",
                    userId,
                },
            });

            return file;
        }),
    updateFile: privateProcedure
        .input(
            z.object({
                id: z.string(),
                question: z.string(),
                cards: z.array(z.string()).min(1).max(10),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const file = await db.file.findFirst({
                where: {
                    id: input.id,
                    userId,
                },
            });

            const cardMeanings = await db.cardMeaning.findMany({
                where: {
                    userId: userId,
                    name: {
                        in: input.cards,
                    },
                },
            });

            const cardMeaningsFormatted = cardMeanings
                .map((cardMeaning) => {
                    return `The ${cardMeaning.name} card means ${cardMeaning.meaning} and the reversed meaning is ${cardMeaning.reversedMeaning}. `;
                })
                .join("");

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            const updatedFile = await db.file.update({
                where: {
                    id: input.id,
                },
                data: {
                    question: input.question,
                    cards: {
                        set: input.cards,
                    },
                },
            });

            await db.message.create({
                data: {
                    text: input.question,
                    isUserMessage: true,
                    userId,
                    fileId: input.id,
                },
            });

            const cardsString = input.cards.join(", ");

            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                stream: true,
                temperature: 0.7,
                messages: [
                    {
                        role: "system",
                        content: `You are a Tarot teacher. Your task is to interpret the cards based on the meanings provided. ${
                            cardMeaningsFormatted
                                ? `${cardMeaningsFormatted} (If a cards meaning is available in the database, use that interpretation. For cards without a custom meaning in the database, or if a card is not found, default to the meanings of the Rider-Waite Tarot cards. This approach ensures a personalized reading while maintaining a connection to traditional interpretations)`
                                : "Take into account the meanings of the Rider-Waite Tarot cards."
                        }`,
                    },
                    {
                        role: "user",
                        content: `The question is: ${input.question}, the spread is the ${file.type} spread. Taking into account the order, the cards are: ${cardsString}.`,
                    },
                ],
            });

            let fullMessage = "";

            for await (const chunk of response) {
                const completion = chunk.choices[0].delta.content;

                if (!completion) continue;
                fullMessage += completion;
            }

            console.log("FULL RESPONSE", fullMessage);

            await db.message.create({
                data: {
                    text: fullMessage,
                    isUserMessage: false,
                    fileId: input.id,
                    userId,
                },
            });
        }),
    getFileMessages: privateProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100),
                fileId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { fileId, limit } = input;

            const file = await db.file.findFirst({
                where: {
                    id: fileId,
                    userId,
                },
            });

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            const messages = await db.message.findMany({
                take: limit! + 1,
                where: {
                    fileId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    isUserMessage: true,
                    createdAt: true,
                    text: true,
                },
            });

            return {
                messages,
            };
        }),
    createStripeSession: privateProcedure.mutation(async ({ ctx }) => {
        const { userId } = ctx;

        const billingUrl = absoluteUrl("/dashboard/billing");

        if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

        const subscriptionPlan = await getUserSubscriptionPlan();

        if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: dbUser.stripeCustomerId,
                return_url: billingUrl,
            });

            return { url: stripeSession.url };
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: billingUrl,
            cancel_url: billingUrl,
            payment_method_types: ["card", "paypal"],
            mode: "subscription",
            billing_address_collection: "auto",
            line_items: [
                {
                    price: PLANS.find((plan) => plan.name === "Pro")?.price
                        .priceIds.test,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: userId,
            },
        });

        return { url: stripeSession.url };
    }),
    createMeaning: privateProcedure
        .input(
            z.object({
                meaning: z.string(),
                reversedMeaning: z.string(),
                slug: z.string(),
                name: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const cardMeaning = await db.cardMeaning.create({
                data: {
                    meaning: input.meaning,
                    reversedMeaning: input.reversedMeaning,
                    slug: input.slug,
                    name: input.name,
                    userId,
                },
            });

            return cardMeaning;
        }),
    getUserMeanings: privateProcedure.query(async ({ ctx }) => {
        const { userId, user } = ctx;
        return await db.cardMeaning.findMany({
            where: {
                userId,
            },
        });
    }),
});

export type AppRouter = typeof appRouter;
