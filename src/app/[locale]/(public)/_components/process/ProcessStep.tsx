"use client";

import {motion} from "framer-motion";
import {itemVariants, lineVariants} from "./animations";
import Pill from "@/components/ui/Pill";
import {IconType} from "react-icons";

interface TimelineItemProps {
    index: number
    label: string;
    Icon: IconType;
    technologies: string[];
    isLast?: boolean;
}

export default function ProcessStep({index, label, Icon, technologies, isLast = false}: TimelineItemProps) {
    return (
        <div
            className="group/item grow flex flex-row justify-start gap-4"
        >
            <div className="flex flex-col items-center">
                <motion.span
                    custom={index}
                    variants={itemVariants}
                    className="bg-neutral-900/80 backdrop-blur-md text-green-400 p-2 border border-green-500/20 rounded-full"
                >
                    <Icon size={12}/>
                </motion.span>
                {isLast ? (
                    <motion.div
                        custom={index}
                        variants={lineVariants}
                        className="grow w-px bg-neutral-600 origin-top"
                    />
                ) : null}
            </div>
            <motion.div
                custom={index}
                variants={itemVariants}
                className="flex flex-col gap-2"
            >
                <h3 className="text-lg">{label}</h3>
                <div className="flex flex-row flex-wrap gap-2 pb-2">
                    {technologies.map((technology) => {
                        return (
                            <Pill key={technology}>
                                {technology}
                            </Pill>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}