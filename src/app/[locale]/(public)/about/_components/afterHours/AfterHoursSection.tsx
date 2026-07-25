"use client";

import {IoFootballOutline, IoGameControllerOutline} from "react-icons/io5";
import {FaJediOrder} from "react-icons/fa6";
import BentoContainer from "@/components/ui/BentoContainer";
import {useTranslations} from "next-intl";
import { motion } from "framer-motion";
import {containerVariants, fadeUpVariants} from "./animations";

export default function AfterHoursSection() {
    const t = useTranslations("aboutPage.AfterHoursSection");

    return (
        <BentoContainer className="row-span-2 col-span-full md:col-span-3 lg:col-span-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                className="flex flex-col gap-4"
            >
                <motion.h2
                    variants={fadeUpVariants}
                    className="text-2xl font-medium"
                >
                    {t("header")}
                </motion.h2>

                <hr className="border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"/>

                <motion.p
                    variants={fadeUpVariants}
                    className="leading-relaxed"
                >
                    {t.rich("paragraph", {
                        highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                    })}
                </motion.p>

                <motion.div
                    variants={fadeUpVariants}
                    className="flex flex-col gap-1"
                >
                    <h3 className="text-green-400 text-lg">{t("hobbies.header")}</h3>
                    <ul>
                        <li className="flex flex-row gap-2 items-center">
                            <IoFootballOutline className="text-green-400"/>
                            {t("hobbies.football")}
                        </li>
                        <li className="flex flex-row gap-2 items-center">
                            <IoGameControllerOutline className="text-green-400"/>
                            {t("hobbies.videoGames")}
                        </li>
                        <li className="flex flex-row gap-2 items-center">
                            <FaJediOrder className="text-green-400"/>
                            {t("hobbies.starWars")}
                        </li>
                    </ul>
                </motion.div>
            </motion.div>
        </BentoContainer>
    );
}