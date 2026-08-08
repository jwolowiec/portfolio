import HeroSection from "./_components/HeroSection";
import ProjectsSection from "./_components/projects/ProjectsSection";
import ExperienceSection from "./_components/experience/ExperienceSection";
import TechnologySection from "./_components/technology/TechnologySection";
import ProcessSection from "./_components/process/ProcessSection";
import ContactSection from "./_components/ContactSection";
import {setRequestLocale} from "next-intl/server";

export default async function Page({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;

    setRequestLocale(locale);

    return (
        <>
            <HeroSection />

            <ProjectsSection />

            <ProcessSection />

            <TechnologySection />

            <ExperienceSection />

            <ContactSection />
        </>
    );
}
