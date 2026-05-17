"use client";

import Image from "@/components/ui/Image";
import BentoContainer from "@/components/ui/BentoContainer";
import {useState} from "react";
import {MdFullscreen} from "react-icons/md";
import Lightbox from "@/components/ui/Lightbox";
import { motion } from "framer-motion";

interface ImageSectionProps {
    src: string;
    alt: string;
}

export default function ImageSection({src, alt}: ImageSectionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <BentoContainer
            className="col-span-full row-span-2"
        >
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, amount: 0.4}}
                transition={{duration: 0.6, ease: "easeInOut"}}
                className="absolute inset-0"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={`object-cover object-top rounded-xl`}
                    loading="eager"
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    fetchPriority="high"
                />
                <button
                    className="absolute bottom-2 right-2 flex flex-col items-center z-10
                        bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30 rounded-xl p-1
                        text-green-400 cursor-pointer hover:scale-105 transition-all duration-400"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <MdFullscreen size={32}/>
                </button>
            </motion.div>
            <Lightbox
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                        loading="lazy"
                    />
                </div>
            </Lightbox>
        </BentoContainer>
    );
}