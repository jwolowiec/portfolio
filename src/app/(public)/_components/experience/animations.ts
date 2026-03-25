import {Variants} from "framer-motion";

export const itemVariants: Variants = {
    hidden: { y: -32, opacity: 0 },
    visible: (index) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            delay: index *  0.1
        }
    })
};