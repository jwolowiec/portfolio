import {stagger, Variants} from "framer-motion";
import {breakpoints} from "@/constants/breakpoints";

export const textContainerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delayChildren: stagger(0.03)
        }
    }
};

export const boxesContainerVariants: Variants = {
    hidden: {},
    visible: () => {
        let isCol = false;

        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            isCol = width >= breakpoints.md && width < breakpoints.lg;
        }

        return {
            transition: {
                duration: 1.0,
                delay: 0.4,
                delayChildren: isCol ? stagger(0.2) : 0
            }
        };
    }
};

export const boxVariants: Variants = {
    hidden: {
        opacity: 0,
        x: "var(--start-x)",
        y: "var(--start-y)"
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};