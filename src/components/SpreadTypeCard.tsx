import React, { useState } from "react";
import Image from "next/image";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { X } from "lucide-react";

type Spread = {
    name: string;
    description: string;
    image: string;
    cardMeaning: string[];
    slug: string;
    plan: string;
};

const SpreadTypeCard = ({
    isSubscribed,
    spread,
    handleSelect,
}: {
    isSubscribed: boolean;
    spread: Spread;
    handleSelect: (name: string) => void;
}) => {
    const { toast } = useToast();
    const [isSelected, setIsSelected] = useState("");
    const [messageError, setMessageError] = useState("");

    return (
        <div key={spread.name}>
            <HoverCard>
                <HoverCardTrigger>
                    <div
                        className={`flex w-full border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg ${
                            isSelected === spread.slug &&
                            "border-orange-400 border-2 rounded-lg hover:border-orange-400"
                        }`}
                    >
                        <div
                            onClick={() => {
                                if (
                                    (spread.plan === "Pro" && isSubscribed) ||
                                    spread.plan === "Free"
                                ) {
                                    handleSelect(spread.name);
                                    setIsSelected(spread.slug);
                                } else {
                                    toast({
                                        action: (
                                            <div className="w-full flex items-center">
                                                <X className="mr-4 text-red-600" />
                                                <span className="first-letter:capitalize">
                                                    You must be subscribed to
                                                    use this feature
                                                </span>
                                            </div>
                                        ),
                                    });
                                }
                            }}
                            className="flex flex-row cursor-pointer w-full"
                        >
                            <Image
                                src={spread.image}
                                alt={spread.name}
                                width={100}
                                height={100}
                                className="rounded-l-md"
                            />
                            <div className="flex flex-col justify-center w-full">
                                <div className="flex flex-row items-center justify-center w-full">
                                    <h1 className="text-lg font-bold">
                                        {spread.name}
                                    </h1>
                                    <p className="bg-gray-200 rounded-full px-2 py-1 text-xs font-bold ml-2">
                                        {spread.plan}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500 text-center">
                                    {spread.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <h1 className="text-lg font-bold mb-2">
                        Card's Position Meaning
                    </h1>
                    {spread.cardMeaning.map((card) => (
                        <p>{card}</p>
                    ))}
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};

export default SpreadTypeCard;
