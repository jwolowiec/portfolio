'use client';

import BentoContainer from "@/components/ui/BentoContainer";
import { TECHNOLOGIES } from "@/constants/technologies";
import {AnimatePresence, motion} from "framer-motion";
import { useState, useEffect } from "react";
import {BREAKPOINTS} from "@/constants/breakpoints";

const gridSize = [
    { minWidth: BREAKPOINTS.lg, cols: 8 },
    { minWidth: BREAKPOINTS.md, cols: 6 },
    { minWidth: BREAKPOINTS.sm, cols: 4 },
];

export default function TechnologySection() {
    const [index, setIndex] = useState<number>(0);
    const [visibleCount, setVisibleCount] = useState<number>(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % TECHNOLOGIES.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const match = gridSize.find(config => width >= config.minWidth);

            setVisibleCount(match ? match.cols : 3);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <BentoContainer className="col-span-full flex flex-col">
            <h2 className="text-2xl font-medium mb-4">Technologie</h2>
            <div className="grow grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center items-center gap-4 h-full w-full">
                {Array.from({ length: visibleCount }).map((_, i) => {
                    const techIndex = (i + index) % TECHNOLOGIES.length;
                    const technology = TECHNOLOGIES[techIndex];

                    return (
                        <div
                            key={i}
                            className="flex justify-center items-center w-full h-full perspective-normal"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={technology.name}
                                    initial={{ rotateY: 90 }}
                                    animate={{
                                        rotateY: 0,
                                        transition: { duration: 0.2, ease: "easeOut" }
                                    }}
                                    exit={{
                                        rotateY: -90,
                                        transition: { duration: 0.2, ease: "easeIn", delay: 0.2 * i }
                                    }}
                                    className="flex flex-col justify-center items-center gap-2"
                                >
                                    <technology.icon size={56} className="text-green-400"/>
                                    <p>{technology.name}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </BentoContainer>
    );
}