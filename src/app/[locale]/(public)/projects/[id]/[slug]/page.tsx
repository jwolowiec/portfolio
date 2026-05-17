import {getTranslations, setRequestLocale} from "next-intl/server";
import {Link, redirect} from "@/i18n/navigation";
import {getLocalizedProjectById} from "@/lib/data/projects/projects";
import {notFound} from "next/navigation";
import ImageSection from "./_components/ImageSection";
import {FaArrowLeft} from "react-icons/fa6";
import Container from "@/components/ui/Container";
import MainSection from "./_components/main/MainSection";
import SideSection from "./_components/side/SideSection";

export default async function Page({params}: { params: Promise<{ locale: string, id: string, slug: string }> }) {
    const {locale, id, slug} = await params;
    setRequestLocale(locale);

    const project = await getLocalizedProjectById(locale, id);
    const t = await getTranslations("projectPage");

    if (!project) {
        notFound();
    }

    if (slug !== project.label.slug) {
        redirect({
            href: `/projects/${project.id}/${project.label.slug}`,
            locale
        });
    }

    return (
        <>
            <div className="fixed z-40 flex flex-row justify-center p-2 lg:p-0.5">
                <Container>
                    <Link
                        href="/projects"
                        className=" flex flex-row gap-3 items-center
                        bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30 rounded-xl py-2 px-4
                        text-green-400 cursor-pointer hover:scale-105 transition-all duration-400"
                    >
                        <FaArrowLeft/>
                        {t("back")}
                    </Link>
                </Container>
            </div>

            <ImageSection
                src={project.image.path}
                alt={`${t("screenshot")}: ${project.label.name}`}
            />

            <MainSection
                name={project.label.name}
                content={project.label.content}
            />

            <SideSection
                technologies={project.technologies}
                characteristics={project.label.characteristics}
                url={project.url}
            />
        </>
    );
};