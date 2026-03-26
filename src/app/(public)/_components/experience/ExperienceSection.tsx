import BentoContainer from "@/components/ui/BentoContainer";
import {timelineData} from "@/app/(public)/_components/experience/data";
import {Timeline, TimelineItem} from "@/app/(public)/_components/experience/Timeline";

export default function ExperienceSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2">
            <h2 className="text-3xl font-medium mb-4">Doświadczenie</h2>
            <Timeline>
                {timelineData.map((item) => {
                    return (
                        <TimelineItem key={item.title} title={item.title} subtitle={item.subtitle} date={item.date} />
                    );
                })}
            </Timeline>
        </BentoContainer>
    );
}