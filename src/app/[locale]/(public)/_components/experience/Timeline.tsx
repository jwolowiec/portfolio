"use client";

import {motion} from "framer-motion";
import React from "react";
import {fadeMoveVariants, fadeStaggerContainerVariants} from "@/lib/animations/variants";
import {duration, viewport} from "@/lib/animations/constants";

interface TimelineItemProps {
    title: string;
    subtitle: string;
    date: string;
}

export function Timeline({children}: {children: React.ReactNode}) {
    return (
        <motion.ol
            variants={fadeStaggerContainerVariants}
            custom={{customStagger: duration.short}}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: viewport.medium}}
            className="flex flex-col gap-4"
        >
            {children}
        </motion.ol>
    );
}

export function TimelineItem({title, subtitle, date}: TimelineItemProps) {
    return (
        <motion.li
            variants={fadeMoveVariants}
            custom={{startY: -16}}
            className="flex flex-row items-center gap-4"
        >
            <div
                className="
                    flex flex-col bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                    hover:border-green-500/30 transition-all duration-400 w-full rounded-lg p-3"
            >
                <p className="font-medium text-green-400">
                    {date}
                </p>
                <h3 className="text-lg font-bold">
                    {title}
                </h3>
                <h4 className="text-base font-medium text-neutral-400">
                    {subtitle}
                </h4>
            </div>
        </motion.li>
    );
}