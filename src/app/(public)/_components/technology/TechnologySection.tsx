'use client';

import BentoContainer from "@/components/ui/BentoContainer";
import { technologies } from "@/constants/technologies";
import { useState, useEffect } from "react";
import TechnologyCard from "@/app/(public)/_components/technology/TechnologyCard";

const MAX_VISIBLE_CARDS = 8;

export default function TechnologySection() {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % technologies.length);
        }, 15000);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <BentoContainer className="col-span-full flex flex-col">
            <div
                className="grow grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center items-center gap-4 h-full w-full"
            >
                {Array.from({ length: MAX_VISIBLE_CARDS }).map((_, i) => {
                    const techIndex = (i + index) % technologies.length;
                    const technology = technologies[techIndex];

                    return (
                        <TechnologyCard key={i} technology={technology} index={i} />
                    )
                })}
            </div>
        </BentoContainer>
    );
}