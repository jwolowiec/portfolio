import HeroSection from "@/app/(public)/_components/HeroSection";
import ProjectsSection from "@/app/(public)/_components/projects/ProjectsSection";
import ExperienceSection from "@/app/(public)/_components/ExperienceSection";
import TechnologySection from "@/app/(public)/_components/technology/TechnologySection";
import AboutMeSection from "@/app/(public)/_components/AboutMeSection";
import ContactSection from "@/app/(public)/_components/ContactSection";

export default function Page() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5 auto-rows-[minmax(12rem,auto)]">
            <HeroSection />

            <ProjectsSection />

            <ExperienceSection />

            <TechnologySection />

            <AboutMeSection />

            <ContactSection />
        </div>
    );
}
