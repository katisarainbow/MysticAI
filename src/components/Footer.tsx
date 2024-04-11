import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <div
            className="flex
         inset-x-0 gap-6 bottom-0 z-30 w-full border-t border-primary/20 bg-primary/50 py-6 px-24 justify-between items-center"
        >
            <div className="w-1/2">
                <p className="text-sm">
                    Looking for language selection?
                    <Link href="/" className="ml-2 font-bold underline">
                        Unified Settings
                    </Link>
                </p>
            </div>

            <div className="flex flex-row justify-end gap-12 items-center w-full">
                <div className="flex flex-row gap-4">
                    <Link href="/terms" className="underline decoration-1">
                        Terms
                    </Link>
                    <Link href="/privacy" className="underline decoration-1">
                        Privacy
                    </Link>
                    <Link href="/cookies" className="underline decoration-1">
                        Cookies
                    </Link>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <img src="/images/logo.png" className="w-14 h-14" />
                    <p className="text-sm">
                        ©2024 MysticAI. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
