'use client';

import BentoContainer from "@/components/ui/BentoContainer";
import {motion, stagger, Variants} from "framer-motion";

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

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            delayChildren: stagger(0.1)
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: -32, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
        }
    }
};

export default function ExperienceSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2">
            <h2 className="text-2xl font-medium mb-4">Doświadczenie</h2>
            <motion.ol
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                className="flex flex-col gap-4"
            >
                {timelineData.map((item) => {
                    return (
                        <motion.li
                            key={item.title}
                            variants={itemVariants}
                            className="flex flex-row items-center gap-4"
                        >
                            <div
                                className="
                                    flex flex-col bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                                    hover:border-neutral-500 transition-all duration-400 w-full rounded-lg p-3"
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
            </motion.ol>
        </BentoContainer>
    );
}