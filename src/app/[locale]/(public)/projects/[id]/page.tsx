import {setRequestLocale} from "next-intl/server";
import {redirect} from "@/i18n/navigation";
import {getLocalizedProjectById, getLocalizedProjects} from "@/lib/data/projects/projects";
import {notFound} from "next/navigation";

interface PageProps {
    locale: string;
    id: string;
}

export async function generateStaticParams({params}: {params: PageProps}) {
    const {locale} = params;
    const projects = await getLocalizedProjects(locale);

    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function Page({params}: { params: Promise<{ locale: string, id: string }> }) {
    const {locale, id} = await params;
    setRequestLocale(locale);

    const project = await getLocalizedProjectById(locale, id);

    if (!project) {
        notFound();
    }

    redirect({
        href: `/projects/${project.id}/${project.label.slug}`,
        locale
    });
};