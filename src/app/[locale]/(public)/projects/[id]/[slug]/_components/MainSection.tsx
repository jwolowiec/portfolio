"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import { motion } from "framer-motion";
import {duration, transition, viewport} from "@/lib/animations/constants";
import {fadeInVariants, fadeStaggerContainerVariants, scaleVariants} from "@/lib/animations/variants";
import MarkdownContainer from "@/components/ui/MarkdownContainer";

interface MainSectionProps {
    name: string;
    content: string;
}

export default function MainSection({name, content}: MainSectionProps) {
    return (
        <BentoContainer className="col-span-full md:col-span-4 lg:col-span-6">
            <motion.div
                variants={fadeStaggerContainerVariants}
                custom={{
                    customTransition: transition.micro,
                    customStagger: duration.short
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: viewport.short}}
                className="flex flex-col gap-5"
            >
                <motion.h1
                    variants={fadeInVariants}
                    className="text-3xl font-bold text-green-400"
                >
                    {name}
                </motion.h1>

                <motion.hr
                    variants={scaleVariants}
                    custom={{
                        scaleX: 0,
                    }}
                    className="origin-left border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"
                />

                <MarkdownContainer
                    markdown={content}
                    variants={fadeInVariants}
                />
            </motion.div>
        </BentoContainer>
    );
}