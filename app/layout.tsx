import type {Metadata} from "next";
import "./globals.css";
import QueryProvider from "@/layouts/QueryProvicer";
import {Inter} from "next/font/google";
import {Toaster} from "sonner";
import {cn} from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="flex flex-row w-full bg-background">
        <div className={cn("overflow-hidden w-full h-screen", inter.className)}>
            <QueryProvider>
                <Toaster/>
                {children}
            </QueryProvider>
        </div>
        </body>

        </html>
    );
}
