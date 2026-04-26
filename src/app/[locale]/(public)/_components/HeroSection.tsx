'use client';

import {motion} from "framer-motion";
import Image from "next/image";
import mainImg from "@public/main-img.jpg";
import BentoContainer from "@/components/ui/BentoContainer";

export default function HeroSection() {
    return (
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
                className="text-center md:text-left flex flex-col gap-3 [--start-x:0rem] [--start-y:12rem] md:[--start-x:-12rem] md:[--start-y:0rem]"
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
    );
}