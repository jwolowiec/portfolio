"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {motion} from "framer-motion";
import TypeWriter from "@/components/ui/TypeWriter";
import {tiles} from "@/app/(public)/_components/about-me/data";
import {boxesContainerVariants, textContainerVariants} from "@/app/(public)/_components/about-me/animations";
import AboutMeTile from "@/app/(public)/_components/about-me/AboutMeTile";

export default function AboutMeSection() {
    return (
        <BentoContainer
            className="col-span-full md:col-span-2 lg:col-span-3 row-span-2 flex flex-col gap-4 justify-between">
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
                {tiles.map((tile) => {
                    return (
                        <AboutMeTile key={tile.text} text={tile.text} Icon={tile.icon} classes={tile.classes} />
                    );
                })}
            </motion.div>
        </BentoContainer>
    );
}