import prisma from "@/lib/prisma/prisma";
import { defaultLocale, locales } from "@/constants/locales";

export async function getLocalizedProjects(locale: string) {
    const validLocale = (locales as readonly string[]).includes(locale)
        ? locale
        : defaultLocale;

    const projects = await prisma.project.findMany({
        where: {
            labels: {
                some: {}
            }
        },
        include: {
            image: true,
            labels: true,
        }
    });

    return projects.map((project) => {
        const targetLabel =
            project.labels.find((l) => l.language === validLocale) ||
            project.labels.find((l) => l.language === defaultLocale) ||
            project.labels[0];

        return {
            ...project,
            label: targetLabel
        };
    });
}