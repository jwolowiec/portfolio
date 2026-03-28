"use client";

import Image, {StaticImageData} from "next/image";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import {LuChevronUp} from "react-icons/lu";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {containerVariants} from "@/app/(public)/_components/projects/animations";

interface ProjectCardProps {
    image: StaticImageData;
    name: string;
    url: string;
    technologies: string[];
    index: number;
}

export default function ProjectCard(props: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <motion.div
            variants={containerVariants}
            custom={props.index}
            initial="hidden"
            animate="visible"
            viewport={{once: true, amount: 0.4}}
            className="
                relative rounded-2xl bg-neutral-900/80 backdrop-blur-md w-full h-full
                border border-neutral-500/30 hover:border-green-500/30 transition-colors duration-400
                overflow-hidden flex flex-col"
        >
            <Image
                src={props.image}
                alt={`Zrzut ekranu: ${props.name}`}
                className="grow object-cover rounded-xl"
                loading="eager"
            />
            <div
                className="absolute bottom-0 inset-0 m-1 flex flex-col justify-end items-center gap-2"
            >
                <button
                    onClick={() => {
                        setIsExpanded(!isExpanded)
                    }}
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
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: isExpanded ? 0 : 0.2
                    }}
                    className={`
                        bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        p-3 rounded-xl w-full flex flex-col gap-2 overflow-hidden`}
                >
                    <h4 className="text-lg text-center font-bold">{props.name}</h4>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial="collapsed"
                                animate={isExpanded ? "expanded" : "collapsed"}
                                variants={{
                                    expanded: {
                                        opacity: 1,
                                        display: "block",
                                        transition: {
                                            display: {delay: 0.3},
                                            opacity: {duration: 0.2, delay: 0.3}
                                        }
                                    },
                                    collapsed: {
                                        opacity: 0,
                                        transitionEnd: {display: "none"},
                                        transition: {opacity: {duration: 0.3}}
                                    }
                                }}
                                className="w-full h-full pt-2 overflow-y-auto scrollbar"
                            >
                                <div className="flex flex-col items-center gap-4 h-full min-h-0 w-full">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            size="sm"
                                            href={props.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Odwiedź
                                        </Button>
                                        <Button variant="secondary" size="sm" href="/projects">Opis</Button>
                                    </div>
                                    <p>Technologie</p>
                                    <div className="flex flex-row justify-center gap-2 flex-wrap">
                                        {props.technologies.map((technology) => {
                                            return (
                                                <Pill key={technology}>{technology}</Pill>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}