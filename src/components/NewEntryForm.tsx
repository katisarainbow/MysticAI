"use client";


import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Button } from "./ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";
import Stepper from "./ui/stepper";


const formSchema = z.object({
    title: z.string().min(1, "Too short!").max(10, "Too long!"),
    name: z.string().min(1, "Too short!").max(10, "Too long!"),
    color: z.string({required_error: "Please select a color."}),
});

const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
};

const NewEntryForm = () => {

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        name: "",
        color: "",
    },
});
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New read</DialogTitle>
                <DialogDescription>
                    Enter all the details of your reading here, and click 'Next'
                    when you're done.
                </DialogDescription>
                
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="title" render={({field}) => (
                         <FormItem className="grid grid-cols-4 items-center gap-4">
                         <FormLabel className="text-right">
                             Title
                         </FormLabel>
                         <Input {...field}  className="col-span-3"/>
                     </FormItem>
                )}/>
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">
                            Name
                        </FormLabel>
                        <Input {...field} className="col-span-3"/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="color" render={({field}) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">
                            Color
                        </FormLabel>
                        <Select  onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                            </FormControl>
                            <FormSelect/>
                        </Select>
                    </FormItem>
                )}/>
                </form>
                <DialogFooter>
                    <Button type="submit">Next</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    );
};

export default NewEntryForm;
