"use client";

import {itemVariants, timelineVariants} from "@/app/(public)/_components/experience/animations";
import {motion} from "framer-motion";
import React from "react";

interface TimelineItemProps {
    title: string;
    subtitle: string;
    date: string;
}

export function Timeline({children}: {children: React.ReactNode}) {
    return (
        <motion.ol
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.4}}
            className="flex flex-col gap-4"
        >
            {children}
        </motion.ol>
    );
}

export function TimelineItem({title, subtitle, date}: TimelineItemProps) {
    return (
        <motion.li
            variants={itemVariants}
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
                <h4 className="text-lg font-bold">
                    {title}
                </h4>
                <h5 className="text-base font-medium text-neutral-400">
                    {subtitle}
                </h5>
            </div>
        </motion.li>
    );
}