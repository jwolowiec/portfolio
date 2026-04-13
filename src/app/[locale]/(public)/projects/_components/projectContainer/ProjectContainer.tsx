"use client";

import {Project} from "@/types/project";
import Image from "next/image";
import BentoContainer from "@/components/ui/BentoContainer";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/button";
import {FaChevronRight} from "react-icons/fa6";
import {FaExternalLinkAlt, FaInfoCircle} from "react-icons/fa";
import {useTranslations} from "next-intl";
import {motion} from "framer-motion";
import {
    containerVariants, fadeUpVariants,
    imageVariants, pillsContainerVariants, pillVariants
} from "./animations";

interface ProjectContainerProps {
    project: Project
    isReversed: boolean
}

export default function ProjectContainer({project, isReversed}: ProjectContainerProps) {
    const t = useTranslations("projectPage");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.2}}
            className="row-span-2 col-span-full grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5"
        >
            <BentoContainer
                className={`row-span-2 col-span-full md:col-span-2 lg:col-span-3 ${isReversed ? 'md:order-last' : ''}`}>
                <motion.div
                    variants={imageVariants}
                    className="w-full h-full"
                >
                    <Image
                        src={project.image}
                        alt={`${t("screenshot")}: ${project.name}`}
                        className="w-full h-96 md:h-full object-cover rounded-xl"
                    />
                </motion.div>
            </BentoContainer>
            <BentoContainer className="row-span-2 col-span-full md:col-span-4 lg:col-span-5 flex flex-col gap-3">
                <motion.h2
                    variants={fadeUpVariants}
                    className="text-2xl text-green-400"
                >
                    {project.name}
                </motion.h2>
                <motion.div
                    variants={pillsContainerVariants}
                    className="flex flex-row flex-wrap gap-2"
                >
                    {project.technologies.map((technology) => {
                        return (
                            <motion.div
                                key={technology}
                                variants={pillVariants}
                            >
                                <Pill color="neutral">{technology}</Pill>
                            </motion.div>
                        );
                    })}
                </motion.div>
                <hr className="border border-neutral-800 group-hover:border-green-500/30 transition-all duration-300"/>
                <div
                    className="grow flex flex-col gap-4"
                >
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-neutral-400"
                    >
                        {project.description}
                    </motion.p>
                    <ul className="flex flex-col gap-3">
                        {project.characteristics.map((characteristic, index) => {
                            return (
                                <motion.li
                                    key={index}
                                    variants={fadeUpVariants}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <FaChevronRight className="text-green-400"/>
                                    <span>{characteristic}</span>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
                <motion.div
                    variants={fadeUpVariants}
                    className="flex flex-col md:flex-row gap-3"
                >
                    <Button
                        className="flex-1 flex flex-row gap-3"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>{t("visit")}</span><FaExternalLinkAlt/>
                    </Button>
                    <Button
                        className="flex-1 flex flex-row gap-3"
                        variant="secondary"
                    >
                        <span>{t("moreInfo")}</span><FaInfoCircle/>
                    </Button>
                </motion.div>
            </BentoContainer>
        </motion.div>
    );
}