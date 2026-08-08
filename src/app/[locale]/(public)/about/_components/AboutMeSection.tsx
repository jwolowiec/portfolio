"use client"

import Button from "@/components/ui/button/Button";
import BentoContainer from "@/components/ui/BentoContainer";
import {useTranslations} from "next-intl";
import {FaGithub, FaLinkedin} from "react-icons/fa6";
import {personalInfo} from "@/constants/personalInfo";
import {motion} from "framer-motion";
import {fadeMoveVariants, staggerContainerVariants} from "@/lib/animations/variants";
import {duration, viewport} from "@/lib/animations/constants";

export default function AboutMeSection() {
    const t = useTranslations("aboutPage.AboutMeSection");

    return (
        <BentoContainer
            className="row-span-2 col-span-full md:col-span-4 lg:col-span-5"
        >
            <motion.div
                variants={staggerContainerVariants}
                custom={{
                    customStagger: duration.short
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: viewport.short}}
                className="flex flex-col justify-between gap-4"
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
                    className="leading-relaxed text-lg"
                >
                    {t.rich("studentParagraph", {
                        highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                    })}
                </motion.p>
                <motion.p
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
                    className="leading-relaxed text-lg"
                >
                    {t.rich("technologyParagraph", {
                        highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                    })}
                </motion.p>
                <motion.div
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
                    className="flex flex-row gap-3"
                >
                    <Button
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                        className="flex flex-row items-center gap-2"
                    >
                        <FaLinkedin/>
                        LinkedIn
                    </Button>

                    <Button
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                        className="flex flex-row items-center gap-2"
                    >
                        <FaGithub/>
                        GitHub
                    </Button>
                </motion.div>
            </motion.div>
        </BentoContainer>
    );
}