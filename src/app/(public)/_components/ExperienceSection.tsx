'use client';

import BentoContainer from "@/components/ui/BentoContainer";
import { motion } from "framer-motion";

const timelineData = [
    {
        date: "2025 - Obecnie",
        title: "Freelance Web Developer",
        subtitle: "Realizacja projektów komercyjnych",
    },
    {
        date: "2023 - Obecnie",
        title: "Politechnika Poznańska",
        subtitle: "Informatyka",
    },
    {
        date: "2018 - 2022",
        title: "Technikum Informatyczne SCI",
        subtitle: "Technik Informatyk",
    }
];

export default function ExperienceSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2">
            <h2 className="text-2xl font-medium mb-4">Doświadczenie</h2>
            <ol className="flex flex-col gap-4">
                {timelineData.map((item, index) => {
                    return (
                        <motion.li
                            initial={{y: -32, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.1 * index
                            }}
                            className="flex flex-row items-center gap-4" key={item.title}
                        >
                            <div
                                className="
                                    flex flex-col bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                                    hover:border-neutral-500 transition-all w-full rounded-lg p-3"
                            >
                                <p className="font-medium text-green-400">
                                    {item.date}
                                </p>
                                <h4 className="text-lg font-bold">
                                    {item.title}
                                </h4>
                                <h5 className="text-base font-medium text-neutral-400">
                                    {item.subtitle}
                                </h5>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
        </BentoContainer>
    );
}