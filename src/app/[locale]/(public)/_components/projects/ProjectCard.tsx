"use client";

import Image from "@/components/ui/Image";
import Button from "@/components/ui/button/Button";
import Pill from "@/components/ui/Pill";
import {LuChevronUp} from "react-icons/lu";
import {useState} from "react";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {LocalizedProject} from "@/types/project";
import {fadeInVariants} from "@/lib/animations/variants";
import {duration, transition} from "@/lib/animations/constants";

interface ProjectCardProps{
    project: LocalizedProject;
    index: number;
}

export default function ProjectCard({project, index}: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const t = useTranslations("homePage.ProjectSection.ProjectCard");

    return (
        <motion.div
            variants={fadeInVariants}
            custom={{customDelay: index * duration.short}}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.4}}
            className="
                relative rounded-2xl bg-neutral-900/80 backdrop-blur-md w-full h-full
                border border-neutral-500/30 hover:border-green-500/30 transition-colors duration-400
                overflow-hidden flex flex-col"
        >
            <Image
                src={project.image.path}
                fill
                alt={`${t("screenShot")}: ${project.label.name}`}
                className="object-cover rounded-xl"
                fetchPriority={index <= 1 ? "high" : "auto"}
                loading={index <= 1 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div
                className="absolute inset-0 m-1 flex flex-col justify-end items-center gap-2"
            >
                <button
                    onClick={() => setIsExpanded(prev => !prev)}
                    aria-label={isExpanded ? t("collapseProject") : t("expandProject")}
                    aria-expanded={isExpanded}
                    className="
                        bg-neutral-900/80 backdrop-blur-md
                        border-neutral-500/30 rounded-full p-1 hover:scale-105"
                >
                    <LuChevronUp
                        className={`text-green-400 ${isExpanded ? "rotate-180" : ""} transition-all duration-500`}
                        strokeWidth={1} size={24}/>
                </button>
                <motion.div
                    initial={false}
                    animate={{ flexGrow: isExpanded ? 1 : 0 }}
                    transition={transition.fast}
                    className="
                        bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        p-3 rounded-xl w-full flex flex-col gap-2 overflow-hidden"
                >
                    <h3 className="text-lg text-center font-bold">{project.label.name}</h3>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, display: "none" }}
                            animate={{ opacity: 1, display: "block" }}
                            transition={{ 
                                display: { delay: duration.medium }, 
                                opacity: { duration: duration.short, delay: duration.medium } 
                            }}
                            className="w-full h-full pt-2 overflow-y-auto scrollbar"
                        >    <div className="flex flex-col items-center gap-4 h-full min-h-0 w-full">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            size="sm"
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t("visitButton")}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            href={`/projects/${project.id}/${project.label.slug}`}
                                        >
                                            {t("projectDescriptionButton")}
                                        </Button>
                                    </div>
                                    <h4>{t("technologies")}</h4>
                                    <div className="flex flex-row justify-center gap-2 flex-wrap">
                                        {project.technologies.map((technology) => {
                                            return (
                                                <Pill key={technology}>{technology}</Pill>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                </motion.div>
            </div>
        </motion.div>
    );
}