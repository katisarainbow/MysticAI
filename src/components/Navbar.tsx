import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
    LoginLink,
    RegisterLink,
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-500/10 bg-background/50 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="flex z-40  ">
                        <div className="flex gap-2 items-center justify-center">
                            <img src="/images/logo.png" className="h-14 w-14" />
                            <span className="font-semibold  items-center justify-center">
                                MysticAI
                            </span>
                        </div>
                    </Link>

                    <MobileNav isAuth={!!user} />

                    <div className="hidden items-center space-x-4 sm:flex">
                        {!user ? (
                            <>
                                <Link
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                    href="/pricing"
                                >
                                    Pricing
                                </Link>
                                <LoginLink
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                >
                                    Sign in
                                </LoginLink>
                                <RegisterLink
                                    className={buttonVariants({
                                        variant: "link",
                                        size: "sm",
                                    })}
                                >
                                    Get started{" "}
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </RegisterLink>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                    href="/cards"
                                >
                                    Cards
                                </Link>
                                <UserAccountNav
                                    name={
                                        !user?.given_name || !user?.family_name
                                            ? "Your Account"
                                            : `${user?.given_name} ${user?.family_name}`
                                    }
                                    email={user.email ?? ""}
                                    imageUrl={user.picture ?? ""}
                                />
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
