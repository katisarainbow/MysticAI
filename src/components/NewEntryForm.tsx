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
import { useState } from "react";
import * as z from "zod";
import SpreadTypeCard from "./SpreadTypeCard";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";

import { tarotSpreads } from "@/config/spread";
import { CheckIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

type TarotSpread = {
    name: string;
    description: string;
    image: string;
    cardMeaning: string[];
    slug: string;
    plan: string;
};

const formSchema = z.object({
    title: z.string().min(1, "Too short!").max(20, "Too long!"),
    name: z.string().min(1, "Too short!").max(20, "Too long!"),
    color: z.string({ required_error: "Please select a color." }),
    type: z.string({ required_error: "Please select a type." }),
});

const NewEntryForm = ({
    isSubscribed,
    handleClose,
}: {
    isSubscribed: boolean;
    handleClose: () => void;
}) => {
    const [step, setStep] = useState(0);

    const { toast } = useToast();
    const router = useRouter();
    const [isSelected, setIsSelected] = useState("");

    const handleSelect = (name: string, slug: string) => {
        setIsSelected(slug);
        form.setValue("type", name);
    };

    const { mutate: createFile } = trpc.createFile.useMutation({
        onSuccess: () => {
            console.log("success");
            toast({
                action: (
                    <div className="w-full flex items-center">
                        <CheckIcon className="mr-4 text-green-600" />
                        <span className="first-letter:capitalize">
                            successfully created
                        </span>
                    </div>
                ),
            });
        },
        onError: () => {
            console.log("error");
            toast({
                action: (
                    <div className="w-full flex items-center">
                        <X className="mr-4 text-red-600" />
                        <span className="first-letter:capitalize">
                            Uh oh! Something went wrong. Try again.
                        </span>
                    </div>
                ),
            });
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const file = createFile(data);
        handleClose();
        console.log(file);
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
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 ">
                            {tarotSpreads.map((spread: TarotSpread) => (
                                <div key={spread.name}>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <div
                                                className={`flex w-full border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-lg ${
                                                    isSelected ===
                                                        spread.slug &&
                                                    "border-orange-400 border-2 rounded-lg hover:border-orange-400"
                                                }`}
                                            >
                                                <SpreadTypeCard
                                                    isSubscribed={isSubscribed}
                                                    spread={spread}
                                                    handleSelect={handleSelect}
                                                />
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
