"use client";
import { trpc } from "@/app/_trpc/client";

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

    console.log(data);
    return (
        <div className="flex flex-col items-center justify-center text-center bg-orange-500/70 p-4 px-24 mb-12 text-background font-semibold">
            <p className="text-lg font-light m-12  p-4 rounded-lg">
                {data?.messages
                    .filter((message) => message.isUserMessage === false)
                    .map((message) => message.text)}
            </p>
        </div>
    );
};

export default TarotResult;
