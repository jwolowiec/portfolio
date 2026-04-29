import BentoContainer from "@/components/ui/BentoContainer";
import {timelineData} from "./data";
import {Timeline, TimelineItem} from "./Timeline";
import {useTranslations} from "next-intl";

export default function ExperienceSection() {
    const t = useTranslations("homePage.ExperienceSection");

    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2">
            <h2 className="text-3xl font-medium mb-4">{t("header")}</h2>
            <Timeline>
                {timelineData.map((item) => {
                    return (
                        <TimelineItem
                            key={item.translationKey}
                            title={t(`items.${item.translationKey}.title`)}
                            subtitle={t(`items.${item.translationKey}.subtitle`)}
                            date={t(`items.${item.translationKey}.date`)}
                        />
                    );
                })}
            </Timeline>
        </BentoContainer>
    );
}