"use client";
import { useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import DialogCardEntry from "./DialogCardEntry";

const CardSpreadEntry = () => {
    const [cards, setCards] = useState<string[]>([]);

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <MaxWidthWrapper className="mb-12 mt-20 sm:mt-20 flex flex-col items-center justify-center text-center">
                <h1 className="head_text text-center">Enter your cards</h1>
                <h3 className="subhead_text text-center">
                    <span className="orange_gradient">Three card</span> spread
                </h3>
                <p className="desc text-center mt-12">
                    Enter the cards in the order you drew them, from left to
                    right, top to bottom. If you want to know more about the
                    spread, click{" "}
                    <a
                        href="https://www.biddytarot.com/tarot-card-meanings/major-arcana/fool/"
                        className="text-center underline text-orange-400"
                    >
                        here
                    </a>
                    .
                </p>
            </MaxWidthWrapper>
            <DialogCardEntry />
        </div>
    );
};

export default CardSpreadEntry;
