"use client"
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

const FormInput = ({
    label,
    field
}: {
    label: string;
    field: ControllerRenderProps<FieldValues>;
}) => {
    return (
        <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">
                {label}
            </FormLabel>
            <Input {...field} className="col-span-3" />
        </FormItem>
    );
};

export default FormInput;
