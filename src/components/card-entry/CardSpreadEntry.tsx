"use client";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DialogCardEntry from "./DialogCardEntry";
import TarotResult from "../TarotResult";
import { Badge } from "../ui/badge";
import { cardImage } from "@/config/card-image";

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

const findCardImage = (name: string) => {
    const card = cardImage.find((card) => card.name === name);
    return card ? card.image : "";
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
        <div className="flex flex-col items-center justify-center text-center bg-gradient-to-t from-orange-100/10 via-orange-500/20 to-orange-100/10">
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
                            left to right, top to bottom.
                        </p>
                    </MaxWidthWrapper>
                    <DialogCardEntry
                        file={file}
                        handleFormSubmit={handleFormSubmit}
                    />
                </>
            ) : (
                <>
                    <MaxWidthWrapper className="mt-24 flex flex-col items-center justify-center text-center">
                        <h1 className="text-7xl font-bold mt-12">
                            Your Tarot Reading
                        </h1>
                        <h3 className="text-5xl font-bold text-center mt-6">
                            <span className="orange_gradient">{file.type}</span>{" "}
                            spread
                        </h3>
                    </MaxWidthWrapper>
                    <div className="mt-4 justify-center text-center bg-gradient-to-t from-orange-100/10 via-orange-500/30 to-orange-100/10 px-12">
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-3 items-center justify-center text-center">
                            {file.cards.map((card) => (
                                <img
                                    src={findCardImage(card)}
                                    alt={card}
                                    className="w-full hover:scale-105 transition duration-300"
                                    key={`card-${card}`}
                                />
                            ))}
                        </div>
                    </div>

                    <TarotResult file={file} />
                </>
            )}
        </div>
    );
};

export default CardSpreadEntry;
