"use client";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DialogCardEntry from "./DialogCardEntry";
import TarotResult from "../TarotResult";
import { Badge } from "../ui/badge";

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

const CardSpreadEntry = ({ file }: { file: File }) => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(
        file.question ? true : false
    );
    const formattedFileType = file.type.replace(/\s+/g, "-").toLowerCase();

    const handleFormSubmit = () => {
        setIsFormSubmitted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center mt-20">
            {!isFormSubmitted ? (
                <>
                    <MaxWidthWrapper className="mb-12 mt-20 sm:mt-20 flex flex-col items-center justify-center text-center">
                        <h1 className="head_text text-center">
                            Enter your cards
                        </h1>
                        <h3 className="subhead_text text-center">
                            <span className="orange_gradient">{file.type}</span>{" "}
                            spread
                        </h3>
                        <p className="desc text-center mt-12">
                            Enter the cards in the order you drew them, from
                            left to right, top to bottom. If you want to know
                            more about the spread, click{" "}
                            <a
                                href={`/spread-meanings/${formattedFileType}`}
                                className="text-center underline text-orange-400"
                            >
                                here
                            </a>
                            .
                        </p>
                    </MaxWidthWrapper>
                    <DialogCardEntry
                        file={file}
                        handleFormSubmit={handleFormSubmit}
                    />
                </>
            ) : (
                <>
                    <MaxWidthWrapper className="my-20 flex flex-col items-center justify-center text-center">
                        <h1 className="text-3xl font-bold">
                            Your Tarot Reading
                        </h1>
                        <h3 className="subhead_text text-center">
                            <span className="orange_gradient">{file.type}</span>{" "}
                            spread
                        </h3>
                        <p className="desc text-center mt-12 text-zinc-600">
                            {file.question}
                        </p>
                        <div className="flex flex-row space-x-4 items-center justify-center text-center mt-6 ">
                            {file.cards.map((card) => (
                                <Badge key={`card-${card}`}>{card}</Badge>
                            ))}
                        </div>
                    </MaxWidthWrapper>
                    <TarotResult file={file} />
                </>
            )}
        </div>
    );
};

export default CardSpreadEntry;
