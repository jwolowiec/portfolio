"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import { motion } from "framer-motion";
import {scaleVariants} from "@/lib/animations/variants";
import {transition, viewport} from "@/lib/animations/constants";
import ExpandableImage from "@/components/ui/ExpandableImage";

interface ImageSectionProps {
    src: string;
    alt: string;
}

export default function ImageSection({src, alt}: ImageSectionProps) {
    return (
        <BentoContainer
            className="col-span-full row-span-2"
        >
            <motion.div
                variants={scaleVariants}
                custom={{
                    scale: 0.8,
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: viewport.medium}}
                transition={transition.default}
                className="absolute inset-0"
            >
                <ExpandableImage src={src} alt={alt} />
            </motion.div>
        </BentoContainer>
    );
}