import Slider from "@/components/ui/Slider";
import ProjectCard from "./ProjectCard";
import {LuArrowRight} from "react-icons/lu";
import BentoContainer from "@/components/ui/BentoContainer";
import {projects} from "./data";
import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

export default function ProjectsSection() {
    const section = useTranslations("homePage.ProjectSection");
    const common = useTranslations("common");

    return (
        <BentoContainer className="col-span-full md:col-span-4 lg:col-span-5 row-span-2 flex flex-col">
            <h2 className="text-3xl font-medium mb-4">{section('header')}</h2>
            <div
                className="h-full"
            >
                <Slider visibleSlides={{lg: 2}} className="gap-3">
                    {projects.length === 0 ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <p>{section('empty')}</p>
                        </div>
                    ) : projects.map((project, index) => {
                        return (
                            <ProjectCard
                                key={index}
                                image={project.image}
                                name={project.name}
                                url={project.url}
                                technologies={project.technologies}
                                index={index}
                            />
                        )
                    })}
                    <div className="w-full h-full flex flex-row justify-center items-center">
                        <Link href="/projects" className="flex flex-col items-center gap-2">
                            <div
                                className="w-12 h-12 flex flex-row justify-center items-center rounded-full border border-green-500/30 text-green-400 hover:scale-110 transition-all">
                                <LuArrowRight/>
                            </div>
                            <p className="text-center text-green-400">{common("seeMore")}</p>
                        </Link>
                    </div>
                </Slider>
            </div>
        </BentoContainer>
    );
}