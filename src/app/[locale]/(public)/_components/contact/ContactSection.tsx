"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {AnimatePresence, motion} from "framer-motion";
import {
    buttonContainerVariants, buttonVariants,
    containerVariants,
    paragraphVariants,
    textWritingVariants
} from "./animations";
import TypeWriter from "@/components/ui/TypeWriter";
import Button from "@/components/ui/button/Button";
import {FaEnvelope, FaGithub, FaLinkedin, FaRegCircleCheck} from "react-icons/fa6";
import {useTranslations} from "next-intl";
import FullscreenModal from "@/components/ui/FullscreenModal";
import {useState} from "react";
import ContactForm from "@/components/features/ContactForm";

export default function ContactSection() {
    const t = useTranslations("homePage.ContactSection");
    const tFormsMessages = useTranslations("forms.contact.message");
    const tCommon = useTranslations("common.buttons");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleClose = () => {
        setIsOpen(false);
        if (isSuccess) setIsSuccess(false);
    };

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
                            size="xl"
                            className="flex flex-row gap-2"
                            onClick={() => {setIsOpen(true)}}
                        >
                            <span><FaEnvelope/></span>{t("messageButton")}
                        </Button>
                        <FullscreenModal
                            isOpen={isOpen}
                            onClose={handleClose}
                            label={t("contactFormLabel")}
                        >
                            <div className="relative">
                                <motion.div
                                    key="contactForm"
                                    animate={{
                                        opacity: isSuccess ? 0 : 1,
                                        pointerEvents: isSuccess ? "none" : "auto"
                                    }}
                                    transition={{
                                        ease: "easeInOut",
                                        duration: 0.4
                                    }}
                                >
                                    <ContactForm
                                        onSuccess={() => {
                                            setIsSuccess(true);
                                        }}
                                        onCancel={handleClose}
                                    />
                                </motion.div>
                                <AnimatePresence>
                                    {isSuccess && (
                                        <motion.div
                                            key="messageSuccess"
                                            initial={{
                                                opacity: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                ease: "easeInOut",
                                                duration: 0.4,
                                                delay: 0.4
                                            }}
                                            className="absolute inset-0 flex flex-col justify-center items-center gap-5 text-green-400"
                                        >
                                            <FaRegCircleCheck size={96}/>
                                            <p className="text-2xl text-center">{tFormsMessages("success")}</p>
                                            <Button
                                                size="lg"
                                                onClick={handleClose}
                                            >
                                                {tCommon("close")}
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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
                                aria-label={t("linkedinAriaLabel")}
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
                                aria-label={t("githubAriaLabel")}
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