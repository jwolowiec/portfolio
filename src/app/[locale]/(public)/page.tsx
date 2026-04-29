import HeroSection from "./_components/HeroSection";
import ProjectsSection from "./_components/projects/ProjectsSection";
import ExperienceSection from "./_components/experience/ExperienceSection";
import TechnologySection from "./_components/technology/TechnologySection";
import ProcessSection from "@/app/[locale]/(public)/_components/process/ProcessSection";
import ContactSection from "./_components/contact/ContactSection";
import {setRequestLocale} from "next-intl/server";
import {use} from "react";

export default function Page({params}: {params: Promise<{locale: string}>}) {
    const {locale} = use(params);

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
