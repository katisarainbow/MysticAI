import Link from "next/link";

const Footer = () => {
    return (
        <div
            className="flex
    inset-x-0 gap-6 bottom-0 z-30 w-full border-t border-primary/20 bg-primary/50 py-6 px-24 justify-end "
        >
            <div className="flex flex-row gap-2 items-center">
                <img src="/images/logo.png" className="w-14 h-14" />
                <p className="text-sm">©2024 MysticAI. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
