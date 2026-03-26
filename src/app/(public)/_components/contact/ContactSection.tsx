"use client";

import BentoContainer from "@/components/ui/BentoContainer";
import {motion} from "framer-motion";
import {
    buttonContainerVariants, buttonVariants,
    containerVariants,
    paragraphVariants,
    textWritingVariants
} from "@/app/(public)/_components/contact/animations";
import TypeWriter from "@/components/ui/TypeWriter";
import Button from "@/components/ui/Button";
import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa6";

export default function ContactSection() {
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
                    <TypeWriter text={"Zainteresowany "}/>
                    <TypeWriter text={"współpracą"} className="text-green-400"/>
                    <TypeWriter text={"?"}/>
                </motion.h2>
                <motion.p
                    variants={paragraphVariants}
                    className="text-lg md:text-xl font-bold"
                >
                    Potrzebujesz <span className="text-green-400">dewelopera</span> albo <span
                    className="text-green-400">strony internetowej</span>? Skontaktuj się ze mną.
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
                        >
                            <span><FaEnvelope/></span>Napisz do mnie
                        </Button>
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