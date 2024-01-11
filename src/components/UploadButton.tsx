"use client";

import { useState } from "react";
import Form from "./NewEntryForm";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

const UploadButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Add new</Button>
            </DialogTrigger>
            <Form />
        </Dialog>
    );
};

export default UploadButton;
