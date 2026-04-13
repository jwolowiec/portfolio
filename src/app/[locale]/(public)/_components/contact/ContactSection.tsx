"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {motion} from "framer-motion";
import {
    buttonContainerVariants, buttonVariants,
    containerVariants,
    paragraphVariants,
    textWritingVariants
} from "./animations";
import TypeWriter from "@/components/ui/TypeWriter";
import Button from "@/components/ui/button";
import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa6";
import {useTranslations} from "next-intl";
import FullscreenModal from "@/components/ui/FullscreenModal";
import {useState} from "react";
import ContactForm from "@/components/features/ContactForm";

export default function ContactSection() {
    const t = useTranslations("homePage.ContactSection");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <BentoContainer className="col-span-full md:col-span-4 lg:col-span-5 row-span-2 flex flex-col">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.4}}
                className="grow flex flex-col justify-center items-center gap-4 p-6 text-center"
            >
                <motion.h2
                    variants={textWritingVariants}
                    className="text-4xl md:text-5xl lg:text-5xl font-extrabold"
                >
                    {t.rich("header", {
                        plain: (chunk) => <TypeWriter text={String(chunk)} />,
                        highlight: (chunk) => <TypeWriter text={String(chunk)} className="text-green-400" />
                    })}
                </motion.h2>
                <motion.p
                    variants={paragraphVariants}
                    className="text-lg md:text-xl font-bold"
                >
                    {t.rich("paragraph", {
                        highlight: (chunk) => <span className="text-green-400">{chunk}</span>
                    })}
                </motion.p>
                <motion.div
                    variants={buttonContainerVariants}
                    className="flex flex-row flex-wrap gap-3 justify-center items-center"
                >
                    <motion.div
                        variants={buttonVariants}
                    >
                        <Button
                            href="#"
                            size="xl"
                            className="flex flex-row gap-2"
                            onClick={() => {setIsOpen(true)}}
                        >
                            <span><FaEnvelope/></span>{t("messageButton")}
                        </Button>
                        <FullscreenModal
                            isOpen={isOpen}
                            onClose={() => {setIsOpen(false)}}
                            label={t("contactFormLabel")}
                        >
                            <ContactForm
                                onSuccess={() => {
                                    console.log("Wysłane")}}
                                onCancel={() => {
                                    console.log("Anulowane")}}
                            />
                        </FullscreenModal>
                    </motion.div>
                    <div className="flex flex-row gap-3">
                        <motion.div
                            variants={buttonVariants}
                        >
                            <Button
                                href="https://www.linkedin.com/in/jakub-wołowiec/"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="xl"
                                variant="secondary"
                                shape="circle"
                            >
                                <FaLinkedin/>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={buttonVariants}
                        >
                            <Button
                                href="https://github.com/jwolowiec"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="xl"
                                variant="secondary"
                                shape="circle"
                            >
                                <FaGithub/>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </BentoContainer>
    )
}