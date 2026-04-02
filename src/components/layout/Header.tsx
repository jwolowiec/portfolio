"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Link, usePathname} from "@/i18n/navigation";
import {useEffect, useState} from "react";
import {LuMenu, LuX} from "react-icons/lu";
import {navLinks} from "@/constants/navigation";
import {useLocale, useTranslations} from "next-intl";
import {locales} from "@/constants/locales";
import Container from "@/components/ui/Container";

export default function Header() {
    const currentLocale = useLocale();
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navLinksT = useTranslations("common.Links.navLinks");
    const localesT = useTranslations("common.Locales");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <header className="w-full flex flex-row justify-center p-2 fixed z-50">
            <Container
                className="hidden md:block"
            >
                <nav className="p-2 grid grid-cols-[1fr_auto_1fr] items-center rounded-4xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800">
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
                </nav>
            </Container>
            <div className="md:hidden fixed right-5 top-5 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full active:scale-90 transition-transform"
                >
                    {isOpen ? <LuX size={24}/> : <LuMenu size={24}/>}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex flex-col">
                        <motion.nav
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.4, ease: "easeInOut"}}
                            className="absolute z-9 w-full h-1/2 bg-neutral-900 border border-neutral-800 rounded-b-2xl flex flex-col justify-center p-4">
                            <ul className="flex flex-col gap-5">
                                {navLinks.map((link, index) => {
                                    const isActive = path === link.href;

                                    return (
                                        <motion.li key={link.href}
                                                   initial={{y: -50, opacity: 0}}
                                                   animate={{y: 0, opacity: 1}}
                                                   exit={{y: -20, opacity: 0}}
                                                   transition={{duration: 0.4, ease: "easeInOut", delay: index * 0.1}}
                                                   className={`px-5 py-1 rounded-3xl z-10 text-xl text-center ${
                                                       isActive ? "text-green-400 bg-green-500/10 border border-green-500/30" : "text-neutral-400 hover:text-white"}`}>
                                            <Link
                                                onClick={() => setIsOpen(false)}
                                                href={link.href}
                                                className="block w-full h-full"
                                            >
                                                {navLinksT(`${link.name}`)}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </motion.nav>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.4, ease: "easeInOut"}}
                            className="backdrop-blur-xs grow w-full h-full"
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
};