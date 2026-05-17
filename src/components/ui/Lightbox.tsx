"use client";

import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect} from "react";
import ClientPortal from "@/components/ui/ClientPortal";
import {LuX} from "react-icons/lu";

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Lightbox({isOpen, onClose, children}: LightboxProps) {
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
        <ClientPortal>
            <AnimatePresence>
                {isOpen && (
                    <section
                        className="fixed inset-0 z-1100 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center"
                    >
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.4, ease: "easeInOut"}}
                            onClick={onClose}
                            className="absolute inset-0"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-neutral-200 hover:scale-110 transition-all z-50 cursor-pointer"
                        >
                            <LuX size={36}/>
                        </button>
                        <motion.div
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.95, opacity: 0}}
                            transition={{duration: 0.4, delay: 0.1, ease: "easeInOut"}}
                            className="max-w-7xl w-full h-full"
                        >
                            {children}
                        </motion.div>
                    </section>
                )}
            </AnimatePresence>
        </ClientPortal>
    );
}