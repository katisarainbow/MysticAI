"use client";

import { trpc } from "@/app/_trpc/client";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "./ui/use-toast";

interface BillingFormProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}
const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {
    const { toast } = useToast();
    const { mutate: createStripeSession, isLoading } =
        trpc.createStripeSession.useMutation({
            onSuccess: ({ url }) => {
                if (url) window.location.href = url;
                if (!url) {
                    toast({
                        title: "There was a problem...",
                        description: "Please try again later",
                        variant: "destructive",
                    });
                }
            },
        });
    return (
        <MaxWidthWrapper>
            <Card>
                <CardHeader>
                    <CardDescription>
                        You are currently on the{" "}
                        <strong>{subscriptionPlan.name}</strong> plan
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button type="submit">
                        {isLoading ? <Loader2 /> : null}
                        {subscriptionPlan.isSubscribed
                            ? "Manage Subscription"
                            : "Upgrade to PRO"}
                    </Button>
                    {subscriptionPlan.isSubscribed ? (
                        <p>
                            {subscriptionPlan.isCanceled
                                ? "Your plan will be canceled on "
                                : "Your plan renews on "}
                            {format(
                                subscriptionPlan.stripeCurrentPeriodEnd!,
                                "dd.MM.yy"
                            )}
                            .
                        </p>
                    ) : null}
                </CardFooter>
            </Card>
        </MaxWidthWrapper>
    );
};

export default BillingForm;
