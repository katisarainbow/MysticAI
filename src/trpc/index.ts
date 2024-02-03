import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

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

            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                stream: true,
                temperature: 0.7,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a Tarot teacher. You must interpret and explain the meaning of each card according to the question asked and the position in which each card is drawn. Avoid delving into scientific explanations, as this is for entertainment purposes. The specific meanings refer to the Rider-Waite Tarot cards.",
                    },
                    {
                        role: "user",
                        content: `The question is: ${input.question}, the spread is ${file.type}. From left to right the first card (past) is: ${input.cards[0]}, the second card (present) is: ${input.cards[1]}, and the third card (future) is: ${input.cards[2]}`,
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
});

export type AppRouter = typeof appRouter;
