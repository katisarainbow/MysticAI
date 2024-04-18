import Link from "next/link";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex flex-col inset-x-0 top-0 items-center justify-between">
            <div className="flex flex-col image_test w-full bg-center h-screen items-center justify-center">
                <div className="bg-black bg-opacity-20 w-full h-screen flex items-center justify-center">
                    <MaxWidthWrapper className="flex flex-col items-center justify-center">
                        <h1 className="head_text text-center text-background">
                            Learn Tarot
                            <br className="max-md:hidden" />
                            <span className="orange_gradient text-center">
                                AI-Powered
                            </span>
                        </h1>
                        <p className="desc text-center text-background">
                            MysticAI stands as a revolutionary open-source AI
                            tool, dedicated to enhancing the Tarot learning
                            journey by providing an accessible and engaging
                            platform for enthusiasts to delve into the mystical
                            realm of Tarot cards.
                        </p>
                        <Link
                            className={buttonVariants({
                                size: "lg",
                                className: "mt-12",
                            })}
                            href="/dashboard"
                            target="_blank"
                        >
                            Get started <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </MaxWidthWrapper>
                </div>
            </div>
            {/*value section */}
            <div>
                <div className="relative isolate">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-100 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-100"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr  from-orange-600 to-amber-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div>
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                {/* image from the project */}
                                <img src="/images/app/1.png" alt="tarot_card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                {/* image from the project */}
                                <img src="/images/app/2.png" alt="tarot_card" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature section */}
            <MaxWidthWrapper>
                <div className="mx-auto py-24 max-w-5xl ">
                    <div className="mb-12 px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
                                Start learning in minutes
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Learning tarot has never been easier than with
                                MysticAI.
                            </p>
                        </div>
                    </div>

                    {/* steps */}
                    <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
                        <li className="md:flex-1">
                            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-orange-600">
                                    Step 1
                                </span>
                                <span className="text-xl font-semibold">
                                    Sign up for an account
                                </span>
                                <span className="mt-2 text-zinc-700">
                                    Either starting out with a free plan or
                                    choose our{" "}
                                    <Link
                                        href="/pricing"
                                        className=" text-orange-600 underline underline-offset-2"
                                    >
                                        pro plan
                                    </Link>
                                    .
                                </span>
                            </div>
                        </li>
                        <li className="md:flex-1">
                            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-orange-600">
                                    Step 2
                                </span>
                                <span className="text-xl font-semibold">
                                    Tell us your card spread
                                </span>
                                <span className="mt-2 text-zinc-700">
                                    With our intuitive interface, it will be
                                    very easy for you to explain your card
                                    spread to us.
                                </span>
                            </div>
                        </li>
                        <li className="md:flex-1">
                            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-orange-600">
                                    Step 3
                                </span>
                                <span className="text-xl font-semibold">
                                    We help you interpret the possible meanings
                                </span>
                                <span className="mt-2 text-zinc-700">
                                    It&apos;s that simple. Try out MysticAI
                                    today - it really takes less than a minute.
                                </span>
                            </div>
                        </li>
                    </ol>
                </div>
            </MaxWidthWrapper>
            <div className="flex flex-col justify-center mb-12">
                <div>
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                {/* image from the project */}
                                <img src="/images/app/6.png" alt="tarot_card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                {/* image from the project */}
                                <img src="/images/app/4.png" alt="tarot_card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="mt-16 flow-root sm:mt-24">
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                {/* image from the project */}
                                <img src="/images/app/5.png" alt="tarot_card" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
