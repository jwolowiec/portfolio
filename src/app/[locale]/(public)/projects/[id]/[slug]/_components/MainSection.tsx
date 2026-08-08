"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {duration, transition, viewport} from "@/lib/animations/constants";
import {fadeInVariants, fadeStaggerContainerVariants, scaleVariants} from "@/lib/animations/variants";

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

                <motion.div
                    variants={fadeInVariants}
                    className="grow max-w-none prose prose-invert prose-green
                            prose-headings:text-neutral-200 prose-headings:font-semibold
                            prose-p:text-neutral-400
                            prose-a:text-green-400 prose-a:hover:text-green-300 prose-a:transition-colors prose-a:duration-200
                            prose-li:text-neutral-400 prose-li:marker:text-green-500/50"
                >
                    <ReactMarkdown>
                        {content}
                    </ReactMarkdown>

                </motion.div>
            </motion.div>
        </BentoContainer>
    );
}