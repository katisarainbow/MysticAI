"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";

const UpgradeButton = () => {
    const { mutate: createStripeSession } =
        trpc.createStripeSession.useMutation({
            onSuccess: ({ url }) => {
                window.location.href = url ?? "/dashboard/billing";
            },
            onError: (error) => {
                console.error(error);
            },
        });

    return (
        <Button onClick={() => createStripeSession()} className="w-full">
            Upgrade Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
    );
};

export default UpgradeButton;
