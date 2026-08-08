"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/button/Button";
import {FaExternalLinkAlt} from "react-icons/fa";
import {FaChevronRight} from "react-icons/fa6";
import {useTranslations} from "next-intl";
import { motion } from "framer-motion";
import {fadeInVariants, fadeStaggerContainerVariants, scaleVariants} from "@/lib/animations/variants";
import {duration, transition, viewport} from "@/lib/animations/constants";

interface SideSectionProps {
    technologies: string[];
    characteristics: string[];
    url: string;
}

export default function SideSection({technologies, characteristics, url}: SideSectionProps) {
    const t = useTranslations("projectPage");

    return (
        <>
            <BentoContainer className="col-span-full md:col-span-2">
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
                    <motion.section
                        variants={fadeInVariants}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-xl">{t("technologies")}</h2>
                        <div className="flex flex-row flex-wrap gap-2">
                            {technologies.map((technology) => {
                                return (
                                    <Pill
                                        key={technology}
                                        color="green"
                                    >
                                        {technology}
                                    </Pill>
                                );
                            })}
                        </div>
                    </motion.section>

                    <motion.hr
                        variants={scaleVariants}
                        custom={{
                            scaleX: 0,
                        }}
                        className="origin-left border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"
                    />

                    <motion.section
                        variants={fadeInVariants}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-xl">{t("characteristics")}</h2>
                        <ul className="flex flex-col gap-3">
                            {characteristics.map((characteristic) => {
                                return (
                                    <li
                                        key={characteristic}
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <span className="shrink-0"><FaChevronRight className="text-green-400"/></span>
                                        {characteristic}
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.section>

                    <motion.hr
                        variants={scaleVariants}
                        custom={{
                            scaleX: 0,
                        }}
                        className="origin-left border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"
                    />

                    <motion.section
                        variants={fadeInVariants}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-xl">{t("links")}</h2>
                        <Button
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            shape="rounded"
                            className="flex flex-row gap-2 items-center"
                        >
                            <span>{t("visit")}</span>
                            <FaExternalLinkAlt/>
                        </Button>
                    </motion.section>
                </motion.div>
            </BentoContainer>
        </>
    );
}