"use client";

import {navLinks} from "@/constants/navigation";
import {Link, usePathname} from "@/i18n/navigation";
import {motion} from "framer-motion";
import {locales} from "@/constants/locales";
import Container from "@/components/ui/Container";
import {useLocale, useTranslations} from "next-intl";

export default function DesktopNav() {
    const currentLocale = useLocale();
    const path = usePathname();
    const navLinksT = useTranslations("common.Links.navLinks");
    const localesT = useTranslations("common.Locales");

    return (
        <nav
            className="hidden md:block w-full bg-linear-to-b from-neutral-950/90 via-neutral-950/50 via-75% to-transparent overflow-hidden"
        >
            <Container className="grid grid-cols-[1fr_auto_1fr] items-center my-2">
                <div></div>
                <ul className="flex items-center bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-3xl p-2 gap-3">
                    {navLinks.map((link) => {
                        const isActive = path === link.href;

                        return (
                            <li key={link.href}
                                className="relative px-5 py-1">
                                <Link
                                    href={link.href}
                                    className={`relative z-10 transition-colors 
                                        ${isActive ? "text-green-400" : "text-neutral-400 hover:text-white"}`}
                                >
                                    {navLinksT(`${link.name}`)}
                                </Link>
                                {isActive && (
                                    <motion.div
                                        style={{originY: '0px'}}
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-green-500/10 border border-green-500/30 rounded-2xl"
                                        transition={{duration: 0.2}}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div className="flex justify-end">
                    <ul className="flex-shrink flex flex-row items-center bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-3xl px-5 gap-3">
                        {locales.map((locale) => {
                            const current = locale === currentLocale;
                            return (
                                <li key={locale} className="py-3">
                                    <Link
                                        href={path}
                                        locale={locale}
                                        className={`${current ? "text-green-400" : "text-neutral-400 hover:text-white"}`}
                                    >
                                        {localesT(`${locale}.shortcut`)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Container>
        </nav>
    );
}