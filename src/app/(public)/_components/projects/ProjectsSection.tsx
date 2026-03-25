'use client';

import {motion} from "framer-motion";
import Slider from "@/components/ui/Slider";
import ProjectCard from "@/app/(public)/_components/projects/ProjectCard";
import {LuArrowRight} from "react-icons/lu";
import BentoContainer from "@/components/ui/BentoContainer";
import grawerkiCnc from "../../../../../public/grawerki-cnc.png";
import embeddedSystemsServer from "../../../../../public/embedded-systems-server.png";

const projects = [
    {
        image: grawerkiCnc,
        name: "PZ Grawerki - Oficjalna strona",
        url: "https://grawerki-cnc.pl",
        technologies: ["Node.js", "Express.js", "MongoDB", "Git", "Ubuntu", "Nginx", "Bootstrap"]
    },
    {
        image: embeddedSystemsServer,
        name: "System zarządzania kartami RFID",
        url: "https://github.com/jwolowiec/embedded-systems-server",
        technologies: ["Node.js", "Express.js", "MongoDB", "Python", "Git", "SQLite", "Bootstrap"]
    }
]

export default function ProjectsSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-4 lg:col-span-5 row-span-2 flex flex-col">
            <h2 className="text-3xl font-medium mb-4">Projekty</h2>
            <div
                className="h-full"
            >
                <Slider breakpoints={{lg: 2}} className="gap-3">
                    {projects.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <p>Brak projektów</p>
                        </div>
                    ) : projects.map((project, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.6, ease: "easeInOut", delay: 0.2 * index}}
                                className="w-full h-full"
                            >
                                <ProjectCard
                                    image={project.image}
                                    name={project.name}
                                    url={project.url}
                                    technologies={project.technologies}
                                />
                            </motion.div>
                        )
                    })}
                    <div className="w-full h-full flex flex-row justify-center items-center">
                        <a href="/projects" className="flex flex-col items-center gap-2">
                            <div
                                className="w-12 h-12 flex flex-row justify-center items-center rounded-full border border-green-500/30 text-green-400 hover:scale-110 transition-all">
                                <LuArrowRight/>
                            </div>
                            <p className="text-center text-green-400">Zobacz więcej</p>
                        </a>
                    </div>
                </Slider>
            </div>
        </BentoContainer>
    );
}