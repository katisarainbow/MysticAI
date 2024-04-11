"use client";
import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import {
    CheckIcon,
    Ghost,
    Loader2,
    Plus,
    Sparkles,
    SquareUserRound,
    Trash,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { useToast } from "./ui/use-toast";

interface PageProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
        string | null
    >(null);

    const utils = trpc.useContext();
    const { toast } = useToast();

    const { data: files, isLoading } = trpc.getUserFiles.useQuery();

    const { mutate: deleteFile } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate();
            toast({
                action: (
                    <div className="w-full flex items-center">
                        <CheckIcon className="mr-4 text-green-600" />
                        <span className="first-letter:capitalize">
                            successfully deleted
                        </span>
                    </div>
                ),
            });
        },
        onMutate: ({ id }) => {
            setCurrentlyDeletingFile(id);
        },
        onSettled() {
            setCurrentlyDeletingFile(null);
        },
    });

    return (
        <main className="mx-auto max-w-7xl min-h-[100vh] md:p-10 mt-20">
            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-7xl text-gray-900">
                    My Tarot Reads
                </h1>
                <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
            </div>

            {/* display all user files */}

            {files && files?.length !== 0 ? (
                <ul className="mt-8 grid grid-cols-1 gap-6 divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {files
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((file) => (
                            <li
                                key={file.id}
                                className={`col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg  ${
                                    file.color === "orange"
                                        ? "hover:shadow-orange-500/30"
                                        : file.color === "blue"
                                        ? "hover:shadow-blue-500/30"
                                        : file.color === "green"
                                        ? "hover:shadow-green-500/30"
                                        : file.color === "red"
                                        ? "hover:shadow-red-500/30"
                                        : file.color === "purple"
                                        ? "hover:shadow-purple-500/30"
                                        : file.color === "yellow"
                                        ? "hover:shadow-yellow-500/30"
                                        : ""
                                }`}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                        <div
                                            className={`h-10 w-10 flex-shrink-0 rounded-full ${
                                                file.color === "orange"
                                                    ? "bg-gradient-to-r from-orange-600 to-amber-500"
                                                    : file.color === "blue"
                                                    ? "bg-gradient-to-r from-blue-600 to-sky-500"
                                                    : file.color === "green"
                                                    ? "bg-gradient-to-r from-green-600 to-lime-500"
                                                    : file.color === "red"
                                                    ? "bg-gradient-to-r from-red-600 to-red-400"
                                                    : file.color === "purple"
                                                    ? "bg-gradient-to-r from-violet-500 to-purple-400"
                                                    : file.color === "yellow"
                                                    ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                                                    : ""
                                            }`}
                                        />

                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-lg font-medium text-zinc-900">
                                                    {file.title}
                                                </h3>
                                            </div>

                                            <Link
                                                className={buttonVariants({
                                                    size: "sm",
                                                    variant: "ghost",
                                                    className:
                                                        "flex-2 mt-2 text-xs bg-gray-200 hover:bg-gray-100",
                                                })}
                                                href={`/reading/${file.id}`}
                                            >
                                                {!file.question
                                                    ? "Start reading"
                                                    : "View lecture"}
                                            </Link>
                                        </div>

                                        <Button
                                            onClick={() =>
                                                deleteFile({ id: file.id })
                                            }
                                            size="sm"
                                            className="text-zinc-500"
                                            variant="ghost"
                                        >
                                            {currentlyDeletingFile ===
                                            file.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Plus className="'h-4 w-4" />
                                        {format(
                                            new Date(file.createdAt),
                                            "MMM yyyy"
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <SquareUserRound className="h-4 w-4" />
                                        <h3>{file.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        <h3>{file.type}</h3>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            ) : isLoading ? (
                <Skeleton height={100} className="my-2" count={3} />
            ) : (
                <div className="mt-20 flex flex-col items-center gap-2">
                    <Ghost className="h-8 w-8 text-zinc-800" />
                    <h3 className="font-semibold text-xl">
                        Pretty empty around here
                    </h3>
                    <p>Let&apos;s start your first TarotAI read.</p>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
