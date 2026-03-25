"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import {itemVariants} from "@/app/(public)/_components/technology/animations";

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
            custom={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            className={`${getResponsiveDisplayClass(index)} justify-center items-center w-full h-full perspective-normal`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={technology.name}
                    initial={{ rotateY: 90 }}
                    animate={{
                        rotateY: 0,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    exit={{
                        rotateY: -90,
                        transition: { duration: 0.2, ease: "easeIn", delay: 0.2 * index }
                    }}
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <technology.icon size={64} className="text-green-400" />
                    <p>{technology.name}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}