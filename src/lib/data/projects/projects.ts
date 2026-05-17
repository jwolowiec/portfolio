import prisma from "@/lib/prisma/prisma";

export async function getLocalizedProjects(locale: string) {
    const projects = await prisma.project.findMany({
        where: {
            labels: {
                some: { language: locale }
            }
        },
        include: {
            image: true,
            labels: {
                where: { language: locale }
            }
        }
    });

    return projects.map((project) => {
        const { labels, ...rest } = project;
        return {
            ...rest,
            label: labels[0]
        };
    });
}

export async function getLocalizedProjectById(locale: string, id: string) {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            image: true,
            labels: {
                where: { language: locale }
            }
        }
    });

    if (!project || project.labels.length === 0) return null;

    const { labels, ...rest } = project;

    return {
        ...rest,
        label: labels[0]
    }
}