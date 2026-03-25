'use client';

import BentoContainer from "@/components/ui/BentoContainer";
import { TECHNOLOGIES } from "@/constants/technologies";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import TechnologyCard from "@/app/(public)/_components/technology/TechnologyCard";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: i * 0.08
        }
    })
};

export default function TechnologySection() {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % TECHNOLOGIES.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [index]);

    const getResponsiveDisplayClass = (i: number): string => {
        if (i < 3) return "block";
        if (i === 3) return "hidden sm:block";
        if (i < 6) return "hidden md:block";
        return "hidden lg:block";
    };

    return (
        <BentoContainer className="col-span-full flex flex-col">
            <div
                className="grow grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center items-center gap-4 h-full w-full"
            >
                {Array.from({ length: 8 }).map((_, i) => {
                    const techIndex = (i + index) % TECHNOLOGIES.length;
                    const technology = TECHNOLOGIES[techIndex];

                    return (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.7 }}
                            className={`h-full w-full ${getResponsiveDisplayClass(i)}`}
                        >
                            <TechnologyCard technology={technology} index={i} />
                        </motion.div>
                    )
                })}
            </div>
        </BentoContainer>
    );
}