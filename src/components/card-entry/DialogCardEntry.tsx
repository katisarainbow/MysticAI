import dos from "@/lib/dos.png";
import tres from "@/lib/tres.png";
import uno from "@/lib/uno.png";
import Image from "next/image";
import { Dialog, DialogFooter, DialogTrigger } from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SelectCard from "./SelectCard";
import { trpc } from "@/app/_trpc/client";
import { Router } from "next/router";
import { useState } from "react";

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

const formSchema = z.object({
    question: z.string({ required_error: "Please enter a question." }),
    cards: z
        .array(z.string({ required_error: "Please select a card." }))
        .min(1)
        .max(10),
});

const DialogCardEntry = ({
    file,
    handleFormSubmit,
}: {
    file: File;
    handleFormSubmit: () => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const cards = {
        first: {
            title: "First Card",
            description: "Add your first card",
            src: "/images/one.png",
            alt: "card with a one",
            value: "cards[0]",
        },
        second: {
            title: "Second Card",
            description: "Enter your second card",
            src: "/images/two.png",
            alt: "card with a two",
            value: "cards[1]",
        },
        third: {
            title: "Third Card",
            description: "Enter your third card",
            src: "/images/three.png",
            alt: "card with a three",
            value: "cards[2]",
        },
        fourth: {
            title: "Fourth Card",
            description: "Enter your fourth card",
            src: "/images/four.png",
            alt: "card with a four",
            value: "cards[3]",
        },
        fifth: {
            title: "Fifth Card",
            description: "Enter your fifth card",
            src: "/images/five.png",
            alt: "card with a five",
            value: "cards[4]",
        },
        sixth: {
            title: "Sixth Card",
            description: "Enter your sixth card",
            src: "/images/six.png",
            alt: "card with a six",
            value: "cards[5]",
        },
        seventh: {
            title: "Seventh Card",
            description: "Enter your seventh card",
            src: "/images/seven.png",
            alt: "card with a seven",
            value: "cards[6]",
        },
        eighth: {
            title: "Eighth Card",
            description: "Enter your eighth card",
            src: "/images/eight.png",
            alt: "card with a eight",
            value: "cards[7]",
        },
        ninth: {
            title: "Ninth Card",
            description: "Enter your ninth card",
            src: "/images/nine.png",
            alt: "card with a nine",
            value: "cards[8]",
        },
        tenth: {
            title: "Tenth Card",
            description: "Enter your tenth card",
            src: "/images/ten.png",
            alt: "card with a ten",
            value: "cards[9]",
        },
        eleventh: {
            title: "Eleventh Card",
            description: "Enter your eleventh card",
            src: "/images/eleven.png",
            alt: "card with a eleven",
            value: "cards[10]",
        },
        twelfth: {
            title: "Twelfth Card",
            description: "Enter your twelfth card",
            src: "/images/twelve.png",
            alt: "card with a twelve",
            value: "cards[11]",
        },
    } as {
        [key: string]: {
            title: string;
            description: string;
            src: string;
            alt: string;
            value: string;
        };
    };

    const { mutate: updateFile } = trpc.updateFile.useMutation({
        onSuccess: () => {
            console.log("success");
            handleFormSubmit();
            setIsLoading(false);
        },
        onError: () => {
            console.log("error");
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        updateFile({ id: file.id, ...data });
        console.log(data, { id: file.id });
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
            cards: [],
        },
    });

    const cardsArray = Object.values(cards);

    return (
        <div className="flex justify-center bg-gradient-to-t from-orange-100/10 via-amber-600/40 to-orange-100/5 w-full mb-12">
            <Form {...form}>
                <form
                    className="flex flex-col justify-center items-center w-full max-w-4xl"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div
                        className={`w-full ${
                            file.type === "One Card"
                                ? "flex items-center justify-center"
                                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center"
                        } py-6 rounded-lg `}
                    >
                        {cardsArray
                            .slice(
                                0,
                                file.type === "One Card"
                                    ? 1
                                    : file.type === "Three Cards"
                                    ? 3
                                    : file.type === "Five-Card"
                                    ? 5
                                    : file.type === "HorseShoe"
                                    ? 7
                                    : file.type === "Celtic Cross"
                                    ? 10
                                    : cardsArray.length
                            )
                            .map((card) => (
                                <div
                                    key={card.alt}
                                    className="flex flex-col w-60 items-center justify-center bg-neutral-200 border border-neutral-300 rounded-lg shadow-md"
                                >
                                    <div className="flex rounded-lg items-center justify-center p-2">
                                        <img
                                            src={card.src}
                                            alt={card.alt}
                                            className="w-full h-full ease-in-out rounded-lg"
                                        />
                                    </div>

                                    <SelectCard {...{ card, form }} />
                                </div>
                            ))}
                    </div>
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem className="w-full px-24 py-12 mt-6 bg-background/50 backdrop-blur-lg rounded-lg shadow-lg">
                                <FormLabel className="text-center text-2xl mb-4 font-semibold">
                                    Please enter your question
                                </FormLabel>
                                <FormControl className="flex justify-center">
                                    <Input
                                        disabled={isLoading}
                                        placeholder="What is your question?"
                                        {...field}
                                        className="text-center border-neutral-300 focus:border-amber-500 focus:ring-amber-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="mb-12 mt-12 w-1/4 self-center text-white font-bold py-2 px-4 rounded-full shadow-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Please Wait" : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default DialogCardEntry;
