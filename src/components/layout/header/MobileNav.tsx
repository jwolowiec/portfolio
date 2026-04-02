"use client";

import {LuMenu, LuX} from "react-icons/lu";
import {AnimatePresence, motion} from "framer-motion";
import {navLinks} from "@/constants/navigation";
import {Link, usePathname} from "@/i18n/navigation";
import {locales} from "@/constants/locales";
import {useEffect, useState} from "react";
import {containerVariants, itemVariants} from "@/components/layout/header/animations";
import {useLocale, useTranslations} from "next-intl";

export default function MobileNav() {
    const currentLocale = useLocale();
    const path = usePathname();
    const navLinksT = useTranslations("common.Links.navLinks");
    const localesT = useTranslations("common.Locales");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
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
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute z-9 w-full h-1/2 bg-neutral-900 border border-neutral-800 rounded-b-2xl flex flex-col justify-center p-4">
                            <ul className="flex flex-col gap-5 text-xl text-center">
                                {navLinks.map((link) => {
                                    const isActive = path === link.href;

                                    return (
                                        <motion.li
                                            key={link.href}
                                            variants={itemVariants}
                                            className={`px-5 py-2 rounded-3xl z-10 ${
                                                isActive ? "text-green-400 bg-green-500/10 border border-green-500/30" : "text-neutral-400 hover:text-white"}`}
                                        >
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
                                <motion.li
                                    variants={itemVariants}
                                    className="flex flex-row justify-center divide-x divide-neutral-500"
                                >
                                    {locales.map((locale) => {
                                        const current = locale === currentLocale;
                                        return (
                                            <Link
                                                key={locale}
                                                href={path}
                                                locale={locale}
                                                className={`text-base px-4 ${current ? "text-green-400" : "text-neutral-400 hover:text-white"}`}
                                            >
                                                {localesT(`${locale}.shortcut`)}
                                            </Link>
                                        );
                                    })}
                                </motion.li>
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
        </>
    );
}