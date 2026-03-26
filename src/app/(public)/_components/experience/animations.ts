import {stagger, Variants} from "framer-motion";

export const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            delayChildren: stagger(0.2)
        }
    }
};

export const itemVariants: Variants = {
    hidden: { y: -32, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
        }
    }
};