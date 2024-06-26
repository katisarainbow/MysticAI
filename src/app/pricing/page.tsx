import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UpgradeButton from "@/components/UpgradeButton";
import { buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Check, HelpCircle, Minus } from "lucide-react";

import Link from "next/link";

interface FeatureItem {
    text: string;
    footnote?: string;
    negative?: boolean;
}

const Page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const pricingItems: {
        plan: string;
        tagline: string;
        quota: number;
        features: FeatureItem[];
    }[] = [
        {
            plan: "Free",
            quota: PLANS.find((p) => p.slug === "free")!.quota,
            tagline: "For knowing the app and asking simple questions.",
            features: [
                {
                    text: "Card and Spread Meanings",
                },
                {
                    text: "Mobile-friendly interface",
                },
                {
                    text: "High-quality responses",
                    footnote:
                        "Better algorithmic responses for enhanced content quality",
                    negative: true,
                },
                {
                    text: "Priority support",
                    negative: true,
                },
                {
                    text: "Unlimited spread types",
                    footnote: "Only supports one-card and three-card spreads.",
                    negative: true,
                },
            ],
        },
        {
            plan: "Pro",
            tagline: "For unlocking all the features you need.",
            quota: PLANS.find((p) => p.slug === "pro")!.quota,
            features: [
                {
                    text: "Card and Spread Meanings",
                },
                {
                    text: "Unlimited spread types",
                    footnote: "Supports all types of spreads.",
                },
                {
                    text: "Mobile-friendly interface",
                },
                {
                    text: "Higher-quality responses",
                    footnote:
                        "Better algorithmic responses for enhanced content quality",
                },
                {
                    text: "Priority support",
                },
            ],
        },
    ];

    return (
        <div className="bg-gradient-to-t from-orange-100/10 via-orange-400/20 to-orange-100/10 flex justify-center items-center">
            <MaxWidthWrapper className="mb-8 mt-32 text-center">
                <div className="mx-auto mb-10 sm:max-w-lg">
                    <h1 className="text-7xl font-bold sm:text-8xl mb-6">
                        Pricing
                    </h1>
                    <p className="mt-5 text-gray-600 sm:text-lg">
                        Whether you&apos;re just trying out our service or need
                        more, we&apos;ve got you covered.
                    </p>
                </div>
                <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 py-12 bg-gradient-to-t from-orange-100/20 via-orange-300 to-orange-100/20 rounded-lg ">
                    <TooltipProvider>
                        {pricingItems.map(
                            ({ plan, tagline, quota, features }) => {
                                const price =
                                    PLANS.find(
                                        (p) => p.slug === plan.toLowerCase()
                                    )?.price.amount || 0;

                                return (
                                    <div
                                        key={plan}
                                        className={cn(
                                            "relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center",
                                            {
                                                "border-2 border-orange-400 ":
                                                    plan === "Pro",
                                                "border border-gray-400 ":
                                                    plan === "Free",
                                            }
                                        )}
                                    >
                                        {plan === "Pro" && (
                                            <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-orange-600 to-amber-400 px-3 py-2 text-sm font-medium text-white">
                                                Upgrade Now
                                            </div>
                                        )}
                                        <div className="p-5 text-center">
                                            <h3 className="my-3 font-display text-3xl font-bold">
                                                {plan}
                                            </h3>
                                            <p className="mt-2 text-gray-500">
                                                {tagline}
                                            </p>
                                            <p className="my-5 font-display text-6xl font-semibold">
                                                ${price}
                                            </p>
                                            <p className="text-gray-500">
                                                per month
                                            </p>
                                        </div>
                                        <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50 w-full">
                                            <div className="flex items-center space-x-1">
                                                <p>
                                                    {quota.toLocaleString()}{" "}
                                                    spreads/mo included
                                                </p>
                                                <Tooltip delayDuration={300}>
                                                    <TooltipTrigger className="cursor-default ml-1.5">
                                                        <HelpCircle className="ml-1 w-4 h-4 text-zinc-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        How many spreads you can
                                                        do per month.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        <ul className="my-10 space-y-5 px-8">
                                            {features.map(
                                                ({
                                                    text,
                                                    footnote,
                                                    negative,
                                                }) => (
                                                    <li
                                                        key={text}
                                                        className="flex space-x-5 justify-center"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            {negative ? (
                                                                <Minus className="h-6 w-6 text-gray-300" />
                                                            ) : (
                                                                <Check className="h-6 w-6 text-orange-500" />
                                                            )}
                                                        </div>
                                                        {footnote ? (
                                                            <div className="flex space-x-1">
                                                                <p
                                                                    className={cn(
                                                                        "text-gray-600",
                                                                        {
                                                                            "text-gray-400":
                                                                                negative,
                                                                        }
                                                                    )}
                                                                >
                                                                    {text}
                                                                </p>
                                                                <Tooltip
                                                                    delayDuration={
                                                                        300
                                                                    }
                                                                >
                                                                    <TooltipTrigger className="cursor-default ml-1.5">
                                                                        <HelpCircle className="ml-1 w-4 h-4 text-zinc-500" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        {
                                                                            footnote
                                                                        }
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </div>
                                                        ) : (
                                                            <p
                                                                className={cn(
                                                                    "text-gray-600",
                                                                    {
                                                                        "text-gray-400":
                                                                            negative,
                                                                    }
                                                                )}
                                                            >
                                                                {text}
                                                            </p>
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <div className="border-t border-gray-200 w-full" />
                                        <div className="w-full">
                                            {plan === "Free" ? (
                                                <Link
                                                    href={
                                                        user
                                                            ? "/dashboard"
                                                            : "/sign-in"
                                                    }
                                                    className={buttonVariants({
                                                        className: "w-full",
                                                        variant: "secondary",
                                                    })}
                                                >
                                                    {user
                                                        ? "Upgrade now"
                                                        : "Sign up"}
                                                </Link>
                                            ) : user ? (
                                                <UpgradeButton />
                                            ) : (
                                                <Link
                                                    href="sign-in"
                                                    className={buttonVariants({
                                                        className: "w-full",
                                                    })}
                                                >
                                                    {user
                                                        ? "Upgrade now"
                                                        : "Sign up"}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </TooltipProvider>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default Page;
