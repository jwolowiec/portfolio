"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {motion, stagger, Variants} from "framer-motion";
import {LuMapPin, LuTerminal, LuAppWindow} from "react-icons/lu";
import TypeWriter from "@/components/ui/TypeWriter";
import {BREAKPOINTS} from "@/constants/breakpoints";

const textContainerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delayChildren: stagger(0.03)
        }
    }
};

const boxesContainerVariants: Variants = {
    hidden: {},
    visible: () => {
        let isCol = false;

        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            isCol = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
        }

        return {
            transition: {
                duration: 1.0,
                delay: 0.4,
                delayChildren: isCol ? stagger(0.2) : 0
            }
        };
    }
};

const boxVariants: Variants = {
    hidden: {
        opacity: 0,
        x: "var(--start-x)",
        y: "var(--start-y)"
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

export default function AboutMeSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2 flex flex-col gap-4 justify-between">
            <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.4}}
                className="flex flex-col gap-3 text-3xl lg:text-4xl font-extrabold text-neutral-200"
            >
                <p>
                    <TypeWriter text={"Projektuję "}/>
                    <TypeWriter text={"design"} className="text-green-400"/>
                    <TypeWriter text={"."}/>
                </p>
                <p>
                    <TypeWriter text={"Piszę "}/>
                    <TypeWriter text={"kod"} className="text-green-400"/>
                    <TypeWriter text={"."}/>
                </p>
                <p>
                    <TypeWriter text={"Wdrażam "}/>
                    <TypeWriter text={"aplikacje"} className="text-green-400"/>
                    <TypeWriter text={"."}/>
                </p>
            </motion.div>

            <motion.div
                variants={boxesContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.4}}
                className="grow grid grid-cols-2 gap-3 [--col:false] md:[--col:true] lg:[--col:false]"
            >
                <motion.div
                    variants={boxVariants}
                    className="
                        flex flex-col col-span-1 md:col-span-2 lg:col-span-1 justify-center items-start gap-3 p-4
                        rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        hover:border-green-500/30 transition-colors duration-400 group/tile
                        [--start-x:-5rem] [--start-y:0] md:[--start-x:0] md:[--start-y:5rem] lg:[--start-x:-5rem] lg:[--start-y:0]"
                >
                    <LuMapPin className="text-neutral-500 group-hover/tile:text-green-400 transition-colors duration-400" size={36}/>
                    <span className="text-base text-neutral-200 font-medium">Poznań/Zdalnie</span>
                </motion.div>

                <motion.div
                    variants={boxVariants}
                    className="
                        flex flex-col col-span-1 md:col-span-2 lg:col-span-1 justify-center items-start gap-3 p-4
                        rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        hover:border-green-500/30 transition-colors duration-400 group/tile
                        [--start-x:5rem] [--start-y:0] md:[--start-x:0] md:[--start-y:5rem] lg:[--start-x:5rem] lg:[--start-y:0]"
                >
                    <LuAppWindow
                        className="text-neutral-500 group-hover/tile:text-green-400 transition-colors duration-400"
                        size={36}/>
                    <span className="text-base text-neutral-200 font-medium">Aplikacje Webowe</span>
                </motion.div>

                <motion.div
                    variants={boxVariants}
                    className="
                        col-span-2 flex flex-row items-center gap-3 p-4
                        rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        hover:border-green-500/30 transition-colors duration-400 group/tile
                        [--start-x:0] [--start-y:5rem]"
                >
                    <LuTerminal className="text-neutral-500 group-hover/tile:text-green-400 transition-colors duration-400"
                                size={36}/>
                    <span className="text-base text-neutral-200 font-medium">Fullstack Developer</span>
                </motion.div>
            </motion.div>

        </BentoContainer>
    );
}