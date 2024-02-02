import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import OpenAI from "openai";

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
                cards: z.array(z.string().min(1).max(10)),
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
        }),
    getTarotReading: privateProcedure
        .input(
            z.object({
                question: z.string(),
                type: z.string(),
                cards: z.array(z.string().min(1).max(10)),
            })
        )
        .query(async ({ input }) => {
            const { question, cards, type } = input;
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a Tarot teacher. You must interpret and explain the meaning of each card according to the question asked and the position in which each card is drawn. Avoid delving into scientific explanations, as this is for entertainment purposes. The specific meanings refer to the Rider-Waite Tarot cards.",
                    },
                    {
                        role: "user",
                        content: `The question is: ${question}, the spread is ${type}. From left to right the first card (past) is: ${cards[0]}, the second card (present) is: ${cards[1]}, and the third card (future) is: ${cards[2]}`,
                    },
                ],
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                max_tokens: 60,
            });
            return { completion };
        }),
});

export type AppRouter = typeof appRouter;
