"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import { motion } from "framer-motion";
import {useTranslations} from "next-intl";
import {fadeMoveVariants, staggerContainerVariants} from "@/lib/animations/variants";
import {duration, viewport} from "@/lib/animations/constants";

export default function HorizonsSection() {
    const t = useTranslations("aboutPage.HorizonsSection");

    return (
        <BentoContainer className="row-span-2 col-span-full md:col-span-3 lg:col-span-4">
            <motion.div
                variants={staggerContainerVariants}
                custom={{
                    customStagger: duration.short
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: viewport.short}}
                className="flex flex-col gap-4"
            >
                <motion.h2
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
                    className="text-2xl font-medium"
                >
                    {t("header")}
                </motion.h2>

                <hr className="border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"/>

                <motion.p
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
                    className="leading-relaxed"
                >
                    {t.rich("deploymentParagraph", {
                        highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                    })}
                </motion.p>
                <motion.p
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
                    className="leading-relaxed"
                >
                    {t.rich("otherTechnologiesParagraph", {
                        highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                    })}
                </motion.p>
            </motion.div>
        </BentoContainer>
    );
}