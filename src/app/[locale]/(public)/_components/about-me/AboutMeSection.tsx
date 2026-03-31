"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {motion} from "framer-motion";
import TypeWriter from "@/components/ui/TypeWriter";
import {tiles} from "./data";
import {boxesContainerVariants, textContainerVariants} from "./animations";
import AboutMeTile from "./AboutMeTile";
import {useTranslations} from "next-intl";

export default function AboutMeSection() {
    const t = useTranslations("homePage.AboutMeSection");

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
                    {t.rich("design", {
                        plain: (chunk) => <TypeWriter text={String(chunk)} />,
                        highlight: (chunk) => <TypeWriter text={String(chunk)} className="text-green-400" />
                    })}
                </p>
                <p>
                    {t.rich("code", {
                        plain: (chunk) => <TypeWriter text={String(chunk)} />,
                        highlight: (chunk) => <TypeWriter text={String(chunk)} className="text-green-400" />
                    })}
                </p>
                <p>
                    {t.rich("deploy", {
                        plain: (chunk) => <TypeWriter text={String(chunk)} />,
                        highlight: (chunk) => <TypeWriter text={String(chunk)} className="text-green-400" />
                    })}
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
                        <AboutMeTile
                            key={tile.translationKey}
                            text={t(`tiles.${tile.translationKey}`)}
                            Icon={tile.icon}
                            classes={tile.classes}
                        />
                    );
                })}
            </motion.div>
        </BentoContainer>
    );
}