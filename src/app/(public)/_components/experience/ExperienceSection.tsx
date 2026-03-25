import BentoContainer from "@/components/ui/BentoContainer";
import {timelineData} from "@/app/(public)/_components/experience/data";
import TimelineItem from "@/app/(public)/_components/experience/TimelineItem";

export default function ExperienceSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2">
            <h2 className="text-3xl font-medium mb-4">Doświadczenie</h2>
            <ol
                className="flex flex-col gap-4"
            >
                {timelineData.map((item, index) => {
                    return (
                        <TimelineItem index={index} key={item.title} title={item.title} subtitle={item.subtitle} date={item.date} />
                    );
                })}
            </ol>
        </BentoContainer>
    );
}