import {use} from "react";
import {setRequestLocale} from "next-intl/server";
import {projects} from "@/constants/projects";
import ProjectContainer from "./_components/projectContainer/ProjectContainer";

export default function Page({params}: {params: Promise<{locale: string}>}) {
    const {locale} = use(params);

    setRequestLocale(locale);

    return projects.map((project, index) => {
        const isReversed = index % 2 === 1;

        return (
            <ProjectContainer key={project.name} project={project} isReversed={isReversed} />
        );
    });
}
