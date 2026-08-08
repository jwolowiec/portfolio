"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import {fadeMoveVariants} from "@/lib/animations/variants";
import {duration, viewport} from "@/lib/animations/constants";

export interface Technology {
    name: string;
    icon: IconType;
}

interface TechnologyCardProps {
    technology: Technology;
    index: number;
}

export default function TechnologyCard({ technology, index }: TechnologyCardProps) {
    const getResponsiveDisplayClass = (i: number): string => {
        if (i < 3) return "flex";
        if (i === 3) return "hidden sm:flex";
        if (i < 6) return "hidden md:flex";
        return "hidden lg:flex";
    };

    return (
        <motion.div
            variants={fadeMoveVariants}
            custom={{startY: 15, customDelay: index * duration.fast}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: viewport.xl }}
            className={`${getResponsiveDisplayClass(index)} justify-center items-center w-full h-full perspective-normal`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={technology.name}
                    initial={{ rotateY: 90 }}
                    animate={{
                        rotateY: 0,
                        transition: { duration: duration.short, ease: "easeOut" }
                    }}
                    exit={{
                        rotateY: -90,
                        transition: { duration: duration.short, ease: "easeIn", delay: duration.short * index }
                    }}
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <technology.icon
                        size={64}
                        className="text-green-400"
                        aria-hidden="true"
                        focusable="false"
                    />
                    <p>{technology.name}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}