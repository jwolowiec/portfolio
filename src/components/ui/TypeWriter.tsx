"use client";

import {motion, Variants} from "framer-motion";

interface TypeWriterProps {
    text: string;
    className?: string;
}

const characterVariants: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
};

export default function TypeWriter(props: TypeWriterProps) {
    const characters = Array.from(props.text);

    return (
        <span className={props.className} aria-label={props.text}>
            {characters.map((character, index) => {
                return (
                    <motion.span
                        key={index}
                        variants={characterVariants}
                        aria-hidden="true"
                    >
                        {character}
                    </motion.span>
                );
            })}
        </span>
    );
}