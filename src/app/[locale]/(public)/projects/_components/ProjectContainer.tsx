"use client";

import Image from "@/components/ui/Image";
import BentoContainer from "@/components/ui/BentoContainer";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/button/Button";
import {FaChevronRight} from "react-icons/fa6";
import {FaExternalLinkAlt, FaInfoCircle} from "react-icons/fa";
import {useTranslations} from "next-intl";
import {motion} from "framer-motion";
import {LocalizedProject} from "@/types/project";
import {duration, transition, viewport} from "@/lib/animations/constants";
import {
    fadeInVariants,
    fadeMoveVariants,
    fadeStaggerContainerVariants,
    scaleVariants,
    staggerContainerVariants
} from "@/lib/animations/variants";

interface ProjectContainerProps {
    project: LocalizedProject;
    isReversed: boolean;
    priority: boolean;
}

export default function ProjectContainer({project, isReversed, priority}: ProjectContainerProps) {
    const t = useTranslations("projectPage");

    return (
        <motion.div
            variants={staggerContainerVariants}
            custom={{
                customStagger: duration.short
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: viewport.short}}
            className="row-span-2 col-span-full grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5"
        >
            <BentoContainer
                className={`row-span-2 col-span-full md:col-span-2 lg:col-span-3 ${isReversed ? 'md:order-last' : ''}`}>
                <motion.div
                    variants={scaleVariants}
                    custom={{
                        scale: 0.9
                    }}
                    className="w-full h-96 md:h-full relative"
                >
                    <Image
                        src={project.image.path}
                        alt={`${t("screenshot")}: ${project.label.name}`}
                        fill
                        className="object-cover rounded-xl"
                        fetchPriority={priority ? "high" : "auto"}
                        loading={priority ? "eager" : "lazy"}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                </motion.div>
            </BentoContainer>
            <BentoContainer className="row-span-2 col-span-full md:col-span-4 lg:col-span-5 flex flex-col gap-3">
                <motion.h2
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
                    className="text-2xl text-green-400"
                >
                    {project.label.name}
                </motion.h2>
                <motion.div
                    variants={fadeStaggerContainerVariants}
                    custom={{
                        customStagger: duration.fast
                    }}
                    className="flex flex-row flex-wrap gap-2"
                >
                    {project.technologies.map((technology) => {
                        return (
                            <motion.div
                                key={technology}
                                variants={fadeInVariants}
                                custom={{
                                    customTransition: transition.micro
                                }}
                            >
                                <Pill color="neutral">{technology}</Pill>
                            </motion.div>
                        );
                    })}
                </motion.div>
                <hr className="border-neutral-800 group-hover:border-green-500/30 transition-all duration-300"/>
                <div
                    className="grow flex flex-col gap-4"
                >
                    <motion.p
                        variants={fadeMoveVariants}
                        custom={{
                            startY: 15
                        }}
                        className="text-neutral-400"
                    >
                        {project.label.description}
                    </motion.p>
                    <ul className="flex flex-col gap-3">
                        {project.label.characteristics.map((characteristic, index) => {
                            return (
                                <motion.li
                                    key={index}
                                    variants={fadeMoveVariants}
                                    custom={{
                                        startY: 15
                                    }}
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
                    variants={fadeMoveVariants}
                    custom={{
                        startY: 15
                    }}
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
                        href={`/projects/${project.id}/${project.label.slug}`}
                    >
                        <span>{t("moreInfo")}</span><FaInfoCircle/>
                    </Button>
                </motion.div>
            </BentoContainer>
        </motion.div>
    );
}