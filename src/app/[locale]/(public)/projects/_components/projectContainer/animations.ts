import {stagger, Variants} from "framer-motion";

export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: stagger(0.15)
        }
    }
}

export const imageVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeOut",
            duration: 0.6
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

export const pillsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: stagger(0.05)
        }
    }
}

export const pillVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            ease: "easeOut",
            duration: 0.2,
        }
    }
}