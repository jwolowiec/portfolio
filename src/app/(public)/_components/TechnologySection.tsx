import BentoContainer from "@/components/ui/BentoContainer";

export default function TechnologySection() {
    return (
        <BentoContainer className="col-span-full">
            <h2 className="text-2xl font-medium">Technologie</h2>
            <div className="flex gap-2 flex-wrap">
                <span className="bg-neutral-800 px-2 py-1 rounded text-xs text-neutral-300">React</span>
                <span className="bg-neutral-800 px-2 py-1 rounded text-xs text-neutral-300">Tailwind</span>
            </div>
        </BentoContainer>
    );
}