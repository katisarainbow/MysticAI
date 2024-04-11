"use client";

import { useState } from "react";
import Form from "./NewEntryForm";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

const UploadButton = ({ isSubscribed }: { isSubscribed: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClose = () => {
        setIsOpen(false);
    };

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
            <Form isSubscribed={isSubscribed} handleClose={handleClose} />
        </Dialog>
    );
};

export default UploadButton;
