import {stagger, Variants} from "framer-motion";

export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: stagger(0.15)
        }
    }
}

export const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "easeOut",
            duration: 0.5
        }
    }
}