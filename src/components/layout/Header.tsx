"use client";

import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";

const navLinks = [
    {name: "Strona główna", href: "/"},
    {name: "Projekty", href: "/projects"},
    {name: "O mnie", href: "/about"},
];

export default function Header() {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

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
        <header className="w-full flex justify-center p-5 fixed z-50">
            <nav
                className="hidden md:flex bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full p-2">
                <ul className="flex gap-3">
                    {navLinks.map((link) => {
                        const isActive = path === link.href;

                        return (
                            <li key={link.href}
                                className="relative px-5 py-1 rounded-full">
                                <Link href={link.href} className={`relative z-10 transition-colors ${
                                    isActive ? "text-green-400" : "text-neutral-400 hover:text-white"
                                }`}>{link.name}</Link>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-green-500/10 border border-green-500/30 rounded-full"
                                        transition={{duration: 0.2}}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="md:hidden fixed right-5 top-5 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full active:scale-90 transition-transform"
                >
                    {isOpen ? <X size={24}/> : <Menu size={24}/>}
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
                                                   initial={{ y: -50, opacity: 0 }}
                                                   animate={{ y: 0, opacity: 1 }}
                                                   exit={{ y: -20, opacity: 0 }}
                                                   transition={{duration: 0.4, ease: "easeInOut", delay: index * 0.1}}
                                                   className={`px-5 py-1 rounded-full z-10 text-xl text-center ${
                                                        isActive ? "text-green-400 bg-green-500/10 border border-green-500/30" : "text-neutral-400 hover:text-white"}`}>
                                            <Link
                                                onClick={() => setIsOpen(false)}
                                                href={link.href}
                                                className="block w-full h-full"
                                            >{link.name}</Link>
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
                            onClick={() => {setIsOpen(false)}}
                        />
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
};