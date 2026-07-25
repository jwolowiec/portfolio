"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import { motion } from "framer-motion";
import {useTranslations} from "next-intl";
import {containerVariants, fadeUpVariants} from "./animations";

export default function EducationSection() {
    const t = useTranslations("aboutPage.EducationSection");

    return (
        <BentoContainer className="row-span-1 col-span-full">
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
                <div
                    className="flex flex-col md:flex-row justify-between md:items-center gap-6 max-md:border-l-2 max-md:border-green-500/30 max-md:pl-4"
                >
                    <motion.div
                        variants={fadeUpVariants}
                        className="flex flex-col"
                    >
                        <p className="text-green-400">{t("school.date")}</p>
                        <h3 className="text-xl">{t("school.title")}</h3>
                        <p className="text-neutral-400">{t("school.subtitle")}</p>
                    </motion.div>

                    <hr className="hidden md:block grow border-green-500/30"/>

                    <motion.div
                        variants={fadeUpVariants}
                        className="flex flex-col md:text-right"
                    >
                        <p className="text-green-400">{t("university.date")}</p>
                        <h3 className="text-xl">{t("university.title")}</h3>
                        <p className="text-neutral-400">{t("university.subtitle")}</p>
                    </motion.div>
                </div>
            </motion.div>
        </BentoContainer>
    );
}