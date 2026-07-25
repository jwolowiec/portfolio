import {stagger, Variants} from "framer-motion";

export const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
            delayChildren: stagger(0.2)
        }
    },
}

export const imageVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut"
        }
    },
}

export const headerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut"
        }
    },
}