"use client";
import { SelectContent, SelectItem } from "./ui/select";

const FormSelect = () => {
    return (
        <SelectContent>
            <SelectItem value="blue">
                <div className=" flex w-full items-center justify-between space-x-4 ">
                    <div className="h-4 w-4  flex-shrink-0 rounded-full bg-gradient-to-r  from-blue-600 to-sky-500 " />

                    <h3 className="flex-1 text-right">Blue</h3>
                </div>
            </SelectItem>
            <SelectItem value="green">
                <div className=" flex w-full items-center justify-between space-x-4 ">
                    <div className="h-4 w-4  flex-shrink-0 rounded-full bg-gradient-to-r  from-emerald-600 to-lime-300 " />

                    <h3 className="flex-1 text-right">Green</h3>
                </div>
            </SelectItem>
            <SelectItem value="orange">
                <div className=" flex w-full items-center justify-between space-x-4 ">
                    <div className="h-4 w-4  flex-shrink-0 rounded-full bg-gradient-to-r  from-orange-600 to-amber-300 " />

                    <h3 className="flex-1 text-right">Orange</h3>
                </div>
            </SelectItem>
            <SelectItem value="red">
                <div className=" flex w-full items-center justify-between space-x-4 ">
                    <div className="h-4 w-4  flex-shrink-0 rounded-full bg-gradient-to-r  from-red-600 to-rose-300 " />

                    <h3 className="flex-1 text-right">Red</h3>
                </div>
            </SelectItem>
            <SelectItem value="purple">
                <div className=" flex w-full items-center justify-between space-x-4 ">
                    <div className="h-4 w-4  flex-shrink-0 rounded-full bg-gradient-to-r  from-purple-600 to-violet-300 " />

                    <h3 className="flex-1 text-right">Purple</h3>
                </div>
            </SelectItem>
        </SelectContent>
    );
};

export default FormSelect;
