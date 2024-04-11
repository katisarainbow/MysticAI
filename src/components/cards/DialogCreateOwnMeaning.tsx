"use client";
import { trpc } from "@/app/_trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Gem } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const DialogCreateOwnMeaning = ({
    slug,
    name,
}: {
    slug: string;
    name: string;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const formSchema = z.object({
        meaning: z.string().min(10),
        reversedMeaning: z.string().min(10),
    });

    const { mutate: createMeaning } = trpc.createMeaning.useMutation({
        onSuccess: () => {
            console.log("success");
            setIsLoading(false);
        },
        onError: () => {
            console.log("error");
        },
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            meaning: "",
            reversedMeaning: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values, { slug });
        setIsLoading(true);
        createMeaning({ slug, name, ...values });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-6 w-1/4">
                    <Gem className="text-background h-4 w-4 mr-1.5" />
                    Add your own meaning
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Gem className="text-orange-400 h-4 w-4 mr-1.5" />
                        Add your own meaning{" "}
                    </DialogTitle>
                    <DialogDescription>
                        Any meaning you contribute will be applied across all
                        your readings. Remember, you have the option to modify
                        it anytime.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="meaning"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your meaning</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type your message here."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {
                                            form.formState.errors[field.name]
                                                ?.message
                                        }
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Collapsible
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className="w-full space-y-2 mt-4"
                        >
                            <div className="flex items-center justify-between space-x-4 px-4">
                                <h4 className="text-sm font-semibold text-zinc-600">
                                    More options
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                <div className="flex flex-col rounded-md border px-4 py-4 text-sm shadow-sm gap-4">
                                    <FormField
                                        control={form.control}
                                        name="reversedMeaning"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Your meaning
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Type your message here."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {
                                                        form.formState.errors[
                                                            field.name
                                                        ]?.message
                                                    }
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCreateOwnMeaning;
