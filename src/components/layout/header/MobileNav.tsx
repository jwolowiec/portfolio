"use client";

import {LuMenu, LuX} from "react-icons/lu";
import {AnimatePresence, motion} from "framer-motion";
import {navLinks} from "@/constants/navigation";
import {Link, usePathname} from "@/i18n/navigation";
import {locales} from "@/constants/locales";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import ClientPortal from "@/components/ui/ClientPortal";
import {
    fadeInVariants,
    fadeStaggerContainerVariants,
} from "@/lib/animations/variants";
import {duration} from "@/lib/animations/constants";

export default function MobileNav() {
    const currentLocale = useLocale();
    const path = usePathname();
    const navLinksT = useTranslations("common.Links.navLinks");
    const localesT = useTranslations("common.Locales");
    const tMobileNav = useTranslations("common.Header.MobileNav");

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
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
            <ClientPortal>
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            id="mobile-navigation-menu"
                            aria-label={tMobileNav("navLabel")}
                            variants={fadeInVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-md flex flex-col justify-center"
                        >
                            <motion.ul
                                variants={fadeStaggerContainerVariants}
                                custom={{
                                    customStagger: duration.fast,
                                    customDelay: duration.short
                                }}
                                className="w-full flex flex-col gap-5 text-xl text-center p-5 overflow-auto min-h-0"
                            >
                                {navLinks.map((link) => {
                                    const isActive = link.href === '/'
                                        ? path === '/'
                                        : path.startsWith(link.href);

                                    return (
                                        <motion.li
                                            key={link.href}
                                            variants={fadeInVariants}
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
                                    variants={fadeInVariants}
                                    className="flex flex-row justify-center divide-x divide-neutral-500"
                                >
                                    {locales.map((locale) => {
                                        const current = locale === currentLocale;
                                        return (
                                            <Link
                                                onClick={() => setIsOpen(false)}
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
                            </motion.ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </ClientPortal>
        </>
    );
}