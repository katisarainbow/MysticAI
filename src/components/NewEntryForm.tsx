"use client";

import { useForm } from "react-hook-form";
import FormSelect from "./FormSelect";
import { Button } from "./ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

import { trpc } from "@/app/_trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import SpreadTypeCard from "./SpreadTypeCard";
import { Card } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";

import { useRouter } from "next/navigation";
import template from "@/lib/template.png";

const spreads = [
    {
        name: "One card",
        number: "1",
        description: "Beginner",
        resume: "This spread is a simple one card spread. It is a great spread for beginners and can be used for a variety of simple questions.",
        image: template,
        slug: "one-card",
        plan: "Free",
    },
    {
        name: "Three cards",
        number: "3",
        description: "Beginner",
        resume: "This spread is a simple three card spread. It is a great spread for beginners and can be used for a variety of questions. Past-Present-Future, Situation-Obstacle-Advice, Mind-Body-Spirit",
        image: template,
        slug: "three-cards",
        plan: "Free",
    },
    {
        name: "Cross Formation",
        number: "5",
        description: "Intermediate",
        resume: "A five-card Tarot spread is also used to explore a theme and variations. The theme card is placed in the center of the other four cards, which form a rectangle around it. It&apos;s usually pulled last. Present, Influences, Challenges, Final Outcome, Theme",
        image: template,
        slug: "cross-formation",
        plan: "Pro",
    },
    {
        name: "HorseShoe",
        number: "7",
        description: "Intermediate-Advance",
        resume: "This reading is great for decision-making, especially when the querent feels unsure how to proceed. Pulling for this reading, you create a V-shape with seven cards. Traditionally, the V opens downward, but you can also flip the shape if you prefer that formation.",
        image: template,
        slug: "horseshoe",
        plan: "Pro",
    },
    {
        name: "Celtic Cross",
        number: "10",
        description: "Advanced",
        resume: "The Celtic Cross is a detailed 10 card layout that answers a time sensitive question. It can be used for general readings, showing the general direction of the seekers life, where they are now and where they are headed.",
        image: template,
        slug: "celtic-cross",
        plan: "Pro",
    },
    {
        name: "The Zodiac Spread",
        number: "12",
        description: "Advanced",
        resume: "The tarot reader shuffles the deck first and then the querent. The reader places the top card face up on the left-hand side, in the 9 o'clock position. The following 11 are dealt face-up in a counter-clockwise direction, with each card corresponding to one of the positions on the face of a clock.",
        image: template,
        slug: "the-zodiac-spread",
        plan: "Pro",
    },
];

const formSchema = z.object({
    title: z.string().min(1, "Too short!").max(10, "Too long!"),
    name: z.string().min(1, "Too short!").max(10, "Too long!"),
    color: z.string({ required_error: "Please select a color." }),
    type: z.string({ required_error: "Please select a type." }),
});

const NewEntryForm = () => {
    const [step, setStep] = useState(0);
    const [isSelected, setIsSelected] = useState("");
    const router = useRouter();

    const handleSelect = (slug: string) => {
        setIsSelected(slug);
    };

    const { mutate: createFile } = trpc.createFile.useMutation({
        onSuccess: () => {
            console.log("success");
        },
        onError: () => {
            console.log("error");
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        createFile(data);
        console.log(data);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            name: "",
            color: "",
            type: "",
        },
    });

    return (
        <DialogContent className={step === 0 ? "max-w-md" : "max-w-2xl"}>
            {step === 0 && (
                <DialogHeader>
                    <DialogTitle>New read</DialogTitle>
                    <DialogDescription>
                        Enter all the details of your reading here, and click
                        &apos;Next&apos; when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
            )}
            {step === 1 && (
                <DialogHeader>
                    <DialogTitle>What type of spread?</DialogTitle>
                    <DialogDescription>
                        Now you can choose your spread type.
                    </DialogDescription>
                </DialogHeader>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4 py-4"
                >
                    {step === 0 && (
                        <>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">
                                            Title
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            className="col-span-3"
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">
                                            Name
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            className="col-span-3"
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">
                                            Color
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select a color" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormSelect />
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {step === 1 && (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            {spreads.map((spread) => (
                                <div key={spread.name}>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <div
                                                className={`flex w-full border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg ${
                                                    isSelected ===
                                                        spread.slug &&
                                                    "border-orange-400 border-2 rounded-lg hover:border-orange-400"
                                                }`}
                                                onClick={() => {
                                                    form.setValue(
                                                        "type",
                                                        spread.name
                                                    );
                                                }}
                                            >
                                                <SpreadTypeCard
                                                    spread={spread}
                                                    handleSelect={handleSelect}
                                                />
                                            </div>
                                        </HoverCardTrigger>
                                    </HoverCard>
                                </div>
                            ))}
                        </div>
                    )}

                    <DialogFooter className="mt-6">
                        {step === 0 && (
                            <Button onClick={() => setStep(step + 1)}>
                                Next
                            </Button>
                        )}
                        {step === 1 && <Button type="submit">Submit</Button>}
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default NewEntryForm;
