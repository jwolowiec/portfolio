import type {Metadata} from "next";
import {Monda} from "next/font/google";
import "../../styles/globals.css";
import React from "react";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {setRequestLocale} from "next-intl/server";

const mondaSans = Monda({
    variable: "--font-monda-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Jakub Wołowiec - Fullstack Developer",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

interface Props {
    children: React.ReactNode;
    params: Promise<{locale: string}>
}

export default async function RootLayout({children, params}: Props) {
    const {locale} = await params;

    setRequestLocale(locale);

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}>
        <body
            className={mondaSans.className}
        >
        <NextIntlClientProvider>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
