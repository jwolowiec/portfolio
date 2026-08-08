import {stagger, Transition, Variants} from "framer-motion";
import {duration, transition} from "@/lib/animations/constants";

interface VariantProps {
    customTransition?: Transition;
    customDelay?: number;
}

interface StartPositionProps {
    startX?: number | string;
    startY?: number | string;
}

interface StaggerContainerProps extends VariantProps {
    customStagger?: number;
}

interface ScaleProps {
    x?: number | string;
    y?: number | string;
}

export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: ({customTransition = transition.default, customDelay = duration.none}: VariantProps = {}) => ({
        opacity: 1,
        transition: {
            ...customTransition,
            ...(customDelay > 0 && { delay: customDelay })
        }
    })
};

export const fadeMoveVariants: Variants = {
    hidden: ({ startX = 0, startY = 0 }: StartPositionProps = {}) => ({
        opacity: 0,
        x: startX,
        y: startY,
    }),
    visible: ({customTransition = transition.default, customDelay = duration.none}: VariantProps = {}) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            ...customTransition,
            ...(customDelay > 0 && { delay: customDelay })
        }
    }),
}

export const staggerContainerVariants: Variants = {
    hidden: {},
    visible: ({customDelay = duration.none, customStagger = duration.none}: StaggerContainerProps = {}) => ({
        transition: {
            delayChildren: stagger(customStagger, { startDelay: customDelay })
        }
    })
}

export const fadeStaggerContainerVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: ({customTransition = transition.default, customDelay = duration.none, customStagger = duration.none}: StaggerContainerProps = {}) => ({
        opacity: 1,
        transition: {
            ...customTransition,
            ...(customDelay > 0 && { delay: customDelay }),
            delayChildren: stagger(customStagger, { startDelay: customDelay })
        }
    })
}

export const blurVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: ({customTransition = transition.default, customDelay = duration.none}: VariantProps = {}) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            ...customTransition,
            ...(customDelay > 0 && { delay: customDelay })
        }
    })
}

export const scaleVariants: Variants = {
    hidden: ({x = 1, y = 1}: ScaleProps = {}) => ({
        opacity: 0,
        scaleX: x,
        scaleY: y,
    }),
    visible: ({customTransition = transition.default, customDelay = duration.none}: VariantProps = {}) => ({
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: {
            ...customTransition,
            ...(customDelay > 0 && { delay: customDelay })
        }
    })
}