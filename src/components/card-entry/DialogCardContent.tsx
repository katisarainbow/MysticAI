"use client";

import { StaticImageData } from "next/image";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type Card = {
    title: string;
    description: string;
    src: StaticImageData;
    alt: string;
    value: string;
};

export const DialogCardContent = ({
    card,
    form,
}: {
    card: Card;
    form: any;
}) => {
    const [apiData, setApiData] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://tarotapi.dev/api/v1/cards/")
            .then((response) => response.json())
            .then((data) => {
                setApiData(data.cards);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {!loading ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{card.title}</DialogTitle>
                        <DialogDescription>
                            {card.description}
                        </DialogDescription>
                    </DialogHeader>
                    <FormField
                        control={form.control}
                        name={card.value}
                        render={({ field }) => (
                            <FormItem className="px-32">
                                <FormLabel>Please enter your card.</FormLabel>

                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select a card" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {apiData.map((card: any) => (
                                                <SelectItem value={card.name}>
                                                    {card.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </DialogContent>
            ) : (
                <DialogContent>
                    {" "}
                    <DialogTitle>{card.title}</DialogTitle>
                    <DialogDescription>{card.description}</DialogDescription>
                    <h1>Loading...</h1>
                </DialogContent>
            )}
        </>
    );
};
