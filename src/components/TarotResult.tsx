"use client";
import { trpc } from "@/app/_trpc/client";
import { Badge } from "./ui/badge";

type File = {
    id: string;
    title: string;
    question: string | null;
    name: string;
    color: string;
    type: string;
    createdAt: Date;
    cards: string[];
    uploadStatus: string;
    userId: string | null;
};

const TarotResult = ({ file }: { file: File }) => {
    const { data } = trpc.getFileMessages.useQuery({
        limit: 2,
        fileId: file.id,
    });

    return (
        <div className="flex flex-col items-center justify-center text-center  p-4 py-12 px-24 mb-12  font-semibold bg-background/50 backdrop-blur-lg m-12  rounded-lg shadow-lg">
            <p className="desc text-center mt-12 text-5xl font-bold">
                {file.question}
            </p>
            <div className="flex flex-row gap-4 mt-4">
                {file.cards.map((card) => (
                    <Badge>{card}</Badge>
                ))}
            </div>

            <p className="text-lg font-light mx-12 mt-12 rounded-lg">
                {data?.messages
                    .filter((message) => message.isUserMessage === false)
                    .map((message) => message.text)}
            </p>
        </div>
    );
};

export default TarotResult;
