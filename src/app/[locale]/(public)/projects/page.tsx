import {getTranslations, setRequestLocale} from "next-intl/server";
import ProjectContainer from "./_components/projectContainer/ProjectContainer";
import {getLocalizedProjects} from "@/lib/data/projects";

export default async function Page({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;

    setRequestLocale(locale);

    const t = await getTranslations({locale, namespace: "projectPage"});
    const projects = await getLocalizedProjects(locale);

    return (
        <>
            <h1 className="sr-only">{t("pageTitle")}</h1>
            {projects.map((project, index) => {
                const isReversed = index % 2 === 1;

                return (
                    <ProjectContainer
                        key={project.id}
                        project={project}
                        isReversed={isReversed}
                        priority={index <= 1}
                    />
                );
            })}
        </>
    );
}
