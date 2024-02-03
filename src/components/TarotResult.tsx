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
        <div className="flex flex-col items-center justify-center text-center ">
            <h1 className="text-3xl font-bold">Your Tarot Reading</h1>
            <p className="text-lg font-light w-1/3 m-12">
                {data?.messages
                    .filter((message) => message.isUserMessage === false)
                    .map((message) => message.text)}
            </p>
        </div>
    );
};

export default TarotResult;
