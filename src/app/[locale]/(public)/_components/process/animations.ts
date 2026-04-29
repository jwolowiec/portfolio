import {stagger, Variants} from "framer-motion";

export const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delayChildren: stagger(0.02)
        }
    }
};

export const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: (index: number) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            delay: index * 0.6,
            duration: 0.4,
            ease: "easeOut"
        }
    })
};

export const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: (index: number) => ({
        scaleY: 1,
        transition: {
            delay: (index * 0.6) + 0.4,
            duration: 0.4,
            ease: "easeInOut"
        }
    })
};