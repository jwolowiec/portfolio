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
    const tMobileNav = useTranslations("common.Header.MobileNav");

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
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation-menu"
                    aria-label={isOpen ? tMobileNav("closeMenu") : tMobileNav("openMenu")}
                    className="p-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full active:scale-90 transition-transform"
                >
                    {isOpen ? <LuX aria-hidden="true" size={24}/> : <LuMenu aria-hidden="true" size={24}/>}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex flex-col">
                        <motion.nav
                            id="mobile-navigation-menu"
                            aria-label={tMobileNav("navLabel")}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute z-9 w-full h-full -top-1/2 bg-neutral-900 border border-neutral-800 rounded-b-2xl flex flex-col justify-end p-4">
                            <ul className="h-1/2 flex flex-col justify-center gap-5 text-xl text-center">
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
                                                aria-current={isActive ? "page" : undefined}
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
                                                aria-current={current ? "true" : undefined}
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
                            aria-hidden="true"
                        />
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}