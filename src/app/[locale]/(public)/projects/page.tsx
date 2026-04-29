import {getTranslations, setRequestLocale} from "next-intl/server";
import {projects} from "@/constants/projects";
import ProjectContainer from "./_components/projectContainer/ProjectContainer";

export default async function Page({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;

    setRequestLocale(locale);

    const t = await getTranslations({locale, namespace: "projectPage"});

    return (
        <>
            <h1 className="sr-only">{t("pageTitle")}</h1>
            {projects.map((project, index) => {
                const isReversed = index % 2 === 1;

                return (
                    <ProjectContainer
                        key={project.name}
                        project={project}
                        isReversed={isReversed}
                        isFirst={index === 0}
                    />
                );
            })}
        </>
    );
}
