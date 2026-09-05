"use client";

import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect} from "react";
import ClientPortal from "@/components/ui/ClientPortal";
import Container from "@/components/ui/Container";
import {LuX} from "react-icons/lu";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    label: string;
}

export default function FullscreenModal({isOpen, onClose, children, label}: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }

        return () => {
            document.documentElement.style.overflow = "";
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
                            transition={{
                                duration: 0.1
                            }}
                            onClick={onClose}
                            className="absolute inset-0"
                        />
                        <Container>
                            <motion.div
                                initial={{y: "-100vh"}}
                                animate={{y: 0}}
                                exit={{y: "-100vh"}}
                                transition={{
                                    duration: 0.4
                                }}
                                className="relative flex flex-col max-h-[90vh] text-neutral-200 bg-neutral-900/80 backdrop-blur-md
                                    border border-neutral-800 p-4 rounded-2xl divide-y divide-neutral-800"
                            >
                                <header
                                    className="flex flex-row justify-between items-center pb-4 mb-4"
                                >
                                    <h2 className="text-2xl">{label}</h2>
                                    <LuX
                                        size={32}
                                        onClick={onClose}
                                        className="cursor-pointer hover:scale-110"
                                    />
                                </header>
                                <div className="overflow-y-auto scrollbar">
                                    {children}
                                </div>
                            </motion.div>
                        </Container>
                    </section>
                )}
            </AnimatePresence>
        </ClientPortal>
    );
}