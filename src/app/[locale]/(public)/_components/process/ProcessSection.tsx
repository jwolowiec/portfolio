"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {motion} from "framer-motion";
import TypeWriter from "@/components/ui/TypeWriter";
import {workTimeline} from "./data";
import {timelineVariants, textContainerVariants} from "./animations";
import {useTranslations} from "next-intl";
import ProcessStep from "./ProcessStep";

export default function ProcessSection() {
    const t = useTranslations("homePage.ProcessSection");

    return (
        <BentoContainer
            className="col-span-full md:col-span-2 lg:col-span-3 row-span-2 flex flex-col gap-4">
            <motion.div
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.4}}
                className="flex flex-col gap-3 text-2xl/10 lg:text-3xl/10 font-extrabold text-neutral-200"
            >
                <h2>{t.rich("headline", {
                    plain: (chunk) => <TypeWriter text={String(chunk)} />,
                    highlight: (chunk) => <TypeWriter text={String(chunk)} className="text-green-400" />
                })}</h2>
            </motion.div>

            <motion.div
                variants={timelineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.4}}
                className="grow flex flex-col"
            >
                {workTimeline.map((item, index) => {
                    return (
                        <ProcessStep
                            key={item.labelKey}
                            index={index}
                            label={t(`timeline.${item.labelKey}.title`)}
                            Icon={item.icon}
                            technologies={item.technologies}
                            isLast={workTimeline.length - 1 === index}
                        />
                    );
                })}
            </motion.div>
        </BentoContainer>
    );
}