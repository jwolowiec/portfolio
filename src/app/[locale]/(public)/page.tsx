import HeroSection from "./_components/HeroSection";
import ProjectsSection from "./_components/projects/ProjectsSection";
import ExperienceSection from "./_components/experience/ExperienceSection";
import TechnologySection from "./_components/technology/TechnologySection";
import AboutMeSection from "./_components/about-me/AboutMeSection";
import ContactSection from "./_components/contact/ContactSection";
import {setRequestLocale} from "next-intl/server";
import {use} from "react";

export default function Page({params}: {params: Promise<{locale: string}>}) {
    const {locale} = use(params);

    setRequestLocale(locale);

    return (
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5 auto-rows-[minmax(12rem,auto)]">
            <HeroSection />

            <ProjectsSection />

            <AboutMeSection />

            <TechnologySection />

            <ExperienceSection />

            <ContactSection />
        </div>
    );
}
