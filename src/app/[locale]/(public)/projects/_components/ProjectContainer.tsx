import {Project} from "@/types/project";
import Image from "next/image";
import BentoContainer from "@/components/ui/BentoContainer";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import {FaChevronRight} from "react-icons/fa6";
import {FaExternalLinkAlt, FaInfoCircle} from "react-icons/fa";
import {useTranslations} from "next-intl";

interface ProjectContainerProps {
    project: Project
    isReversed: boolean
}

const translations = {
    alt: "Zrzut ekranu: ",
}

export default function ProjectContainer({project, isReversed}: ProjectContainerProps) {
    const t = useTranslations("projectPage");

    return (
        <div className="row-span-2 col-span-full grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5">
            <BentoContainer
                className={`row-span-2 col-span-full md:col-span-2 lg:col-span-3 ${isReversed ? 'md:order-last' : ''}`}>
                <Image
                    src={project.image}
                    alt={translations.alt}
                    className="w-full h-96 md:h-full object-cover rounded-xl"
                />
            </BentoContainer>
            <BentoContainer className="row-span-2 col-span-full md:col-span-4 lg:col-span-5 flex flex-col gap-3">
                <h2 className="text-2xl text-green-400">
                    {project.name}
                </h2>
                <div className="flex flex-row flex-wrap gap-2">
                    {project.technologies.map((technology) => {
                        return (
                            <Pill color="neutral" key={technology}>{technology}</Pill>
                        );
                    })}
                </div>
                <hr className="border border-neutral-800 group-hover:border-green-500/30 transition-all duration-300"/>
                <div className="grow flex flex-col gap-4">
                    <p className="text-neutral-400">
                        {project.description}
                    </p>
                    <ul className="flex flex-col gap-3">
                        {project.characteristics.map((characteristic, index) => {
                            return (
                                <li
                                    key={index}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <FaChevronRight className="text-green-400"/>
                                    <span>{characteristic}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <Button className="flex-1 flex flex-row gap-3"><span>{t("visit")}</span><FaExternalLinkAlt /></Button>
                    <Button className="flex-1 flex flex-row gap-3" variant="secondary"><span>{t("moreInfo")}</span><FaInfoCircle /></Button>
                </div>
            </BentoContainer>
        </div>
    );
}