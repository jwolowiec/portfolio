import HeroSection from "@/app/(public)/_components/HeroSection";
import ProjectsSection from "@/app/(public)/_components/projects/ProjectsSection";
import ExperienceSection from "@/app/(public)/_components/ExperienceSection";
import TechnologySection from "@/app/(public)/_components/TechnologySection";

export default function Page() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-3 auto-rows-[minmax(12rem,auto)]">
            <HeroSection />

            <ProjectsSection />

            <ExperienceSection />

            <TechnologySection />
        </div>
    );
}
