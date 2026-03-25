import {Variants} from "framer-motion";

export const containerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: (index: number) => ({
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};