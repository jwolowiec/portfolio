import {stagger, Variants} from "framer-motion";

export const containerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delayChildren: stagger(0.4)
        }
    }
}

export const textWritingVariants: Variants = {
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

export const paragraphVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(0.5rem)'
    },
    visible: {
        opacity: 1,
        filter: 'blur(0)',
        transition: {
            duration: 0.4,
        }
    }
};

export const buttonContainerVariants: Variants = {
    visible: {
        transition: {
            duration: 1,
            delayChildren: stagger(0.2)
        }
    }
};

export const buttonVariants: Variants = {
    hidden: {
        opacity: 0,
        y: "2rem",
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.4,
            bounce: 0.5
        }
    }
};