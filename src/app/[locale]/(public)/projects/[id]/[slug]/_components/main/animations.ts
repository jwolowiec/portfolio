import {stagger, Variants} from "framer-motion";

export const mainVariants: Variants = {
    "hidden": {
        opacity: 0
    },
    "visible": {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
            delayChildren: stagger(0.2)
        }
    }
};

export const mainItemVariants: Variants = {
    "hidden": {
        opacity: 0
    },
    "visible": {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        }
    }
}

export const separatorVariants: Variants = {
    "hidden": {
        opacity: 0,
        scaleX: 0,
        originX: 0,
    },
    "visible": {
        opacity: 1,
        scaleX: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        }
    }
}