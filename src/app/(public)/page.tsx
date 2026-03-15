'use client';

import BentoContainer from "@/components/ui/BentoContainer";
import Image from "next/image";
import mainImg from "../../../public/main-img.jpg";
import {motion} from "framer-motion";
import Slider from "@/components/ui/Slider";
import {ArrowRight} from "lucide-react";
import grawerkiCnc from "../../../public/grawerki-cnc.png";
import embeddeSystemsServer from "../../../public/embedded-systems-server.png";
import ProjectCard from "@/app/(public)/_components/ProjectCard";

export default function Page() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-3 auto-rows-[minmax(12rem,auto)]">
            <BentoContainer
                className="col-span-full row-span-2 flex flex-col md:flex-row-reverse justify-center items-center gap-3 md:gap-4 lg:gap-12">
                <motion.div
                    className="flex flex-col justify-center items-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.6, ease: "easeOut", delay: 0.2}}
                >
                    <Image
                        className="border-3 border-green-500/30 w-48 h-48 md:w-64 md:h-64 rounded-full object-cover object-top"
                        src={mainImg} alt={"Jakub Wołowiec - zdjęcie"} loading="eager"/>
                </motion.div>
                <motion.div
                    className="text-center md:text-left [--start-x:0rem] [--start-y:12rem] md:[--start-x:-12rem] md:[--start-y:0rem]"
                    initial={{opacity: 0, x: "var(--start-x)", y: "var(--start-y)"}}
                    animate={{opacity: 1, x: 0, y: 0}}
                    transition={{duration: 0.6, ease: "easeOut", delay: 0.2}}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Jakub Wołowiec
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-4xl text-green-400">
                        Fullstack Developer
                    </p>
                </motion.div>
            </BentoContainer>

            <BentoContainer className="col-span-full md:col-span-4 lg:col-span-5 row-span-2 flex flex-col">
                <h2 className="text-2xl font-medium mb-4">Projekty</h2>
                <motion.div
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale: 1.0, opacity: 1}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                    className="h-full"
                >
                    <Slider breakpoints={{lg: 2}} className="gap-3">
                        <ProjectCard
                            image={grawerkiCnc}
                            name="PZ Grawerki - Oficjalna strona"
                            url="https://grawerki-cnc.pl"
                            technologies={["Node.js", "Express.js", "MongoDB", "Git", "Ubuntu", "Nginx", "Bootstrap"]}
                        />
                        <ProjectCard
                            image={embeddeSystemsServer}
                            name="System zarządzania kartami RFID"
                            url="https://github.com/jwolowiec/embedded-systems-server"
                            technologies={["Express.js", "MongoDB"]}
                        />
                        <div className="w-full h-full flex flex-row justify-center items-center">
                            <a href="/projects" className="flex flex-col items-center gap-2">
                                <div
                                    className="w-12 h-12 flex flex-row justify-center items-center rounded-full border border-green-500/30 text-green-400 hover:scale-110 transition-all">
                                    <ArrowRight/>
                                </div>
                                <p className="text-center text-green-400">Zobacz więcej</p>
                            </a>
                        </div>
                    </Slider>
                </motion.div>
            </BentoContainer>

            <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2">
                <h2 className="text-2xl font-medium">Doświadczenie</h2>
            </BentoContainer>

            <BentoContainer className="col-span-full">
                <h2 className="text-2xl font-medium">Technologie</h2>
                <div className="flex gap-2 flex-wrap">
                    <span className="bg-neutral-800 px-2 py-1 rounded text-xs text-neutral-300">React</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded text-xs text-neutral-300">Tailwind</span>
                </div>
            </BentoContainer>
        </div>
    );
}
