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
import SpreadTypeCard from "./card-entry/SpreadTypeCard";
import { Card } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";

import template from "@/lib/template.png";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1, "Too short!").max(10, "Too long!"),
    name: z.string().min(1, "Too short!").max(10, "Too long!"),
    color: z.string({ required_error: "Please select a color." }),
    type: z.string({ required_error: "Please select a type." }),
});

const NewEntryForm = () => {
    const [step, setStep] = useState(0);
    const [selected, isSelected] = useState(false);
    const router = useRouter();
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
        <DialogContent>
            {step === 0 && (
                <DialogHeader>
                    <DialogTitle>New read</DialogTitle>
                    <DialogDescription>
                        Enter all the details of your reading here, and click
                        'Next' when you're done.
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
                        <HoverCard>
                            <HoverCardTrigger>
                                <Card
                                    className={`flex flex-row items-center w-60 hover:border-1 hover:border-gray-300 hover:shadow-lg cursor-pointer ${
                                        selected &&
                                        "border-orange-400 border-2 hover:border-orange-400"
                                    }`}
                                    onClick={() => {
                                        form.setValue("type", "Three cards");
                                        isSelected(true);
                                    }}
                                >
                                    <Image
                                        src={template}
                                        alt="leaf"
                                        width={100}
                                        height={100}
                                        className="rounded-l-md"
                                    />
                                    <div className="flex flex-col items-center justify-center w-40">
                                        <h1 className="text-lg font-bold w-full text-center">
                                            Three Card
                                        </h1>
                                        <p className="text-sm text-gray-500">
                                            Beginner
                                        </p>
                                    </div>
                                </Card>
                            </HoverCardTrigger>
                            <SpreadTypeCard />
                        </HoverCard>
                    )}
                    <DialogFooter>
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
