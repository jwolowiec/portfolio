"use client";

import {IconType} from "react-icons";
import {motion} from "framer-motion";
import {boxVariants} from "./animations";

interface AboutMeTileProps {
    text: string;
    Icon: IconType;
    classes: string;
}

export default function AboutMeTile({text, Icon, classes}: AboutMeTileProps) {
    return (
        <motion.div
            variants={boxVariants}
            className={`
                ${classes} gap-3 p-4
                rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                hover:border-green-500/30 transition-colors duration-400 group/tile`}
        >
            <Icon className="text-neutral-500 group-hover/tile:text-green-400 transition-colors duration-400" size={36}/>
            <span className="text-base text-neutral-200 font-medium">{text}</span>
        </motion.div>
    );
}