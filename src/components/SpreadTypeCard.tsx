import React, { useState } from "react";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import Image, { StaticImageData } from "next/image";

type Spread = {
    name: string;
    number: string;
    description: string;
    resume: string;
    image: StaticImageData;
    slug: string;
    plan: string;
};

const SpreadTypeCard = ({
    spread,
    handleSelect,
}: {
    spread: Spread;
    handleSelect: (slug: string) => void;
}) => {
    return (
        <div
            onClick={() => handleSelect(spread.slug)}
            className="flex flex-row mr-4 cursor-pointer w-full"
        >
            <Image
                src={spread.image}
                alt={spread.name}
                width={100}
                height={100}
                className="rounded-l-md"
            />
            <div className="flex flex-col justify-center w-full">
                <h1 className="text-lg font-bold w-full text-center">
                    {spread.name}
                </h1>
                <p className="text-sm text-gray-500 text-center">
                    {spread.description}
                </p>
            </div>
        </div>
    );
};

export default SpreadTypeCard;
