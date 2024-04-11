import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Inter, Sacramento } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import "react-loading-skeleton/dist/skeleton.css";

import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import PageTransition from "@/components/framer-motion/PageTransition";

const inter = Inter({ subsets: ["latin"] });
const sacramento = Sacramento({ weight: ["400"], subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <Providers>
                <body
                    className={cn(
                        "min-h-screen font-sans antialiased grainy",
                        inter.className
                    )}
                >
                    <Navbar />
                    {children}
                    <Toaster />
                    <Footer />
                </body>
            </Providers>
        </html>
    );
}
