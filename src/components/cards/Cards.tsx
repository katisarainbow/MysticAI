"use client";

import { cardImage } from "@/config/card-image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import DialogCreateOwnMeaning from "./DialogCreateOwnMeaning";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { trpc } from "@/app/_trpc/client";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { Gem } from "lucide-react";

type TarotCard = {
    name: string;
    name_short: string;
    type: string;
    desc: string;
    meaning_up: string;
    meaning_rev: string;
    suit: string;
};

const typeCards = [
    "Major Arcana",
    "Pentacles",
    "Swords",
    "Wands",
    "Cups",
    "All",
];

interface PageProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Cards = ({ subscriptionPlan }: PageProps) => {
    const { user } = useKindeBrowserClient();
    const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
    const [isSelected, setIsSelected] = useState<TarotCard | null>(null);
    const [filteredTarotCards, setFilteredTarotCards] = useState<TarotCard[]>(
        []
    );
    const [loading, setLoading] = useState(true);

    const { data: userMeanings, isLoading } = trpc.getUserMeanings.useQuery();

    console.log(userMeanings);

    useEffect(() => {
        fetch("https://tarotapi.dev/api/v1/cards/")
            .then((response) => response.json())
            .then((data) => {
                setTarotCards(data.cards);
                setLoading(false);
                setFilteredTarotCards(data.cards);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const findCardImage = (nameShort: string) => {
        const card = cardImage.find((card) => card.name_short === nameShort);
        return card ? card.image : "";
    };

    const filterCards = (type?: string) => {
        if (type === "All" || !type) {
            setFilteredTarotCards(tarotCards);
            setIsSelected(null);
            return;
        }

        const typeToFilterMap: { [key: string]: string } = {
            "Major Arcana": "major",
            Pentacles: "pentacles",
            Swords: "swords",
            Wands: "wands",
            Cups: "cups",
        };

        const filterType = typeToFilterMap[type] ?? "";
        const filtered = tarotCards.filter((card) => {
            return card.type === filterType || card.suit === filterType;
        });

        setFilteredTarotCards(filtered);
        setIsSelected(null);
    };

    const selectedCard = (nameShort: string) => {
        const selected = tarotCards.find(
            (card) => card.name_short === nameShort
        );
        setIsSelected(selected ?? null);
        window.scrollTo(0, 0);
    };

    return (
        <div
            className={`flex flex-col mt-20 gap-6 items-center justify-center min-h-[100vh]  ${
                filteredTarotCards && filteredTarotCards.length > 0
                    ? filteredTarotCards[0].suit === "pentacles"
                        ? "bg-gradient-to-t from-yellow-100/10 via-amber-400/40 to-yellow-100/10"
                        : filteredTarotCards[0].suit === "swords"
                        ? "bg-gradient-to-t from-stone-100/10 via-stone-600/40 to-stone-100/10"
                        : filteredTarotCards[0].suit === "wands"
                        ? "bg-gradient-to-t from-yellow-100/10 via-yellow-700/40 to-yellow-100/5"
                        : filteredTarotCards[0].suit === "cups"
                        ? "bg-gradient-to-t from-sky-100/10 via-slate-500/40 to-sky-100/10"
                        : "bg-gradient-to-t from-orange-100/10 via-orange-500/50 to-orange-100/10"
                    : "bg-gradient-to-t from-orange-100/10 via-orange-500/50 to-orange-100/10"
            }`}
        >
            <h1 className="text-7xl font-bold mt-12">Tarot Cards</h1>
            <div className="flex flex-wrap gap-2">
                {typeCards.map((type) => (
                    <Badge
                        key={type}
                        onClick={() => filterCards(type)}
                        className={`${
                            filteredTarotCards && filteredTarotCards.length > 0
                                ? filteredTarotCards[0].suit === "pentacles"
                                    ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                    : filteredTarotCards[0].suit === "swords"
                                    ? "bg-gradient-to-r from-stone-500 to-stone-400"
                                    : filteredTarotCards[0].suit === "wands"
                                    ? "bg-gradient-to-r from-yellow-800 to-yellow-700"
                                    : filteredTarotCards[0].suit === "cups"
                                    ? "bg-gradient-to-r from-slate-700  to-slate-500"
                                    : "bg-gradient-to-r from-orange-500 to-amber-500"
                                : "bg-gradient-to-r from-orange-500 to-amber-400"
                        } cursor-pointer hover:scale-110 transform transition duration-300`}
                    >
                        {type}
                    </Badge>
                ))}
            </div>

            {isSelected && (
                <div
                    className={`${
                        filteredTarotCards && filteredTarotCards.length > 0
                            ? filteredTarotCards[0].suit === "pentacles"
                                ? "bg-gradient-to-t from-orange-100/10 via-amber-600/40 to-orange-100/5"
                                : filteredTarotCards[0].suit === "swords"
                                ? "bg-gradient-to-t from-stone-100/10 via-slate-600/60 to-stone-100/5"
                                : filteredTarotCards[0].suit === "wands"
                                ? "bg-gradient-to-t from-yellow-100/10 via-yellow-800/40 to-yellow-100/5"
                                : filteredTarotCards[0].suit === "cups"
                                ? "bg-gradient-to-t from-sky-100/10 via-slate-600/40 to-sky-100/5"
                                : "bg-gradient-to-t from-orange-100/10 via-orange-400/50 to-orange-100/5"
                            : "bg-gradient-to-t from-orange-100/10 via-orange-500/50 to-orange-100/5"
                    } px-8 mt-6`}
                >
                    <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:justify-start lg:items-start bg-background/50 backdrop-blur-lg rounded-lg shadow-lg px-6 py-16">
                        <div className="w-full sm:w-full md:w-1/2 lg:w-1/3">
                            <img
                                src={findCardImage(isSelected.name_short)}
                                alt={isSelected.name}
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full mr-12">
                            <h1 className="text-4xl font-bold mb-2 uppercase">
                                {isSelected.name}
                            </h1>
                            <h3 className="text-xl font-bold ">Description:</h3>
                            <p>{isSelected.desc}</p>
                            <h3 className="text-xl font-bold ">Meaning:</h3>
                            <p>{isSelected.meaning_up}</p>
                            <h3 className="text-xl font-bold ">
                                Reversed Meaning:
                            </h3>
                            <p>{isSelected.meaning_rev}</p>
                            {userMeanings &&
                                userMeanings.map((meaning) => {
                                    return (
                                        meaning.slug ===
                                            isSelected.name_short && (
                                            <div
                                                className="flex flex-col gap-2 mt-2"
                                                key={meaning.id}
                                            >
                                                <h1 className="text-xl font-bold ">
                                                    My Meaning:
                                                </h1>
                                                <p>{meaning.meaning}</p>
                                                <h1 className="text-xl font-bold mt-2">
                                                    My Reversed Meaning:
                                                </h1>
                                                <p>{meaning.reversedMeaning}</p>
                                            </div>
                                        )
                                    );
                                })}
                            {user && subscriptionPlan.isSubscribed && (
                                <DialogCreateOwnMeaning
                                    slug={isSelected.name_short}
                                    name={isSelected.name}
                                />
                            )}
                            {user && !subscriptionPlan.isSubscribed && (
                                <Button
                                    onClick={() =>
                                        (window.location.href = "/pricing")
                                    }
                                    className={`${
                                        filteredTarotCards &&
                                        filteredTarotCards.length > 0
                                            ? filteredTarotCards[0].suit ===
                                              "pentacles"
                                                ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                                : filteredTarotCards[0].suit ===
                                                  "swords"
                                                ? "bg-gradient-to-r from-stone-500 to-stone-400"
                                                : filteredTarotCards[0].suit ===
                                                  "wands"
                                                ? "bg-gradient-to-r from-yellow-800 to-yellow-700"
                                                : filteredTarotCards[0].suit ===
                                                  "cups"
                                                ? "bg-gradient-to-r from-slate-700  to-slate-500"
                                                : "bg-gradient-to-r from-orange-500 to-amber-500"
                                            : "bg-gradient-to-r from-orange-500 to-amber-400"
                                    } cursor-pointer hover:scale-110 transform transition duration-300 w-1/4 mt-6`}
                                >
                                    <Gem className="text-background h-4 w-4 mr-1.5" />
                                    Add your own meaning
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 items-center py-12 px-20">
                {filteredTarotCards ? (
                    filteredTarotCards.map((card) => (
                        <div
                            className={`flex items-center flex-col`}
                            key={card.name_short}
                        >
                            <img
                                src={findCardImage(card.name_short)}
                                alt={card.name}
                                className="hover:scale-110 transform transition duration-300 cursor-pointer"
                                onClick={() => selectedCard(card.name_short)}
                            />
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default Cards;
