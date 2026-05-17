import {setRequestLocale} from "next-intl/server";
import {redirect} from "@/i18n/navigation";
import {getLocalizedProjectById} from "@/lib/data/projects/projects";
import {notFound} from "next/navigation";

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