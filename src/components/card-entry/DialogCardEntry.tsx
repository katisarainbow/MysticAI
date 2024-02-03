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

const formSchema = z.object({
    question: z.string({ required_error: "Please enter a question." }),
    cards: z
        .array(z.string({ required_error: "Please select a card." }))
        .min(1)
        .max(10),
});

const DialogCardEntry = ({
    fileid,
    handleFormSubmit,
}: {
    fileid: string;
    handleFormSubmit: () => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const cards = {
        first: {
            title: "First Card",
            description: "Add your first card",
            src: uno,
            alt: "uno",
            value: "cards[0]",
        },
        second: {
            title: "Second Card",
            description: "Enter your second card",
            src: dos,
            alt: "dos",
            value: "cards[1]",
        },
        third: {
            title: "Third Card",
            description: "Enter your third card",
            src: tres,
            alt: "tres",
            value: "cards[2]",
        },
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
        updateFile({ id: fileid, ...data });
        console.log(data, { id: fileid });
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
        <Form {...form}>
            <form
                className="justify-center items-center py-12 "
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem className="px-32">
                            <FormLabel>Please enter your question</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isLoading}
                                    placeholder="What is your question?"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 py-12 justify-center items-center  bg-gradient-to-t from-orange-100/10 via-orange-200/90 to-orange-100/10 rounded-lg">
                    {cardsArray.map((card) => {
                        return (
                            <div
                                key={card.alt}
                                className="flex flex-col justify-center items-center  px-4 py-4"
                            >
                                <Image
                                    src={card.src}
                                    alt={card.alt}
                                    width={600}
                                    height={600}
                                    className="mb-6 hover:scale-110 transform transition duration-300 ease-in-out"
                                />
                                <SelectCard {...{ card, form }} />
                            </div>
                        );
                    })}
                </div>
                <Button
                    type="submit"
                    className="mb-12 mt-12 w-1/4"
                    disabled={isLoading}
                >
                    {isLoading ? "Please Wait" : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default DialogCardEntry;
