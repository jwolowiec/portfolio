import BentoContainer from "@/components/ui/BentoContainer";
import {useTranslations} from "next-intl";

export default function HorizonsSection() {
    const t = useTranslations("aboutPage.HorizonsSection");

    return (
        <BentoContainer className="row-span-2 col-span-full md:col-span-3 lg:col-span-4 flex flex-col gap-4">
            <h2 className="text-2xl font-medium">{t("header")}</h2>

            <hr className="border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"/>

            <p className="leading-relaxed">
                {t.rich("deploymentParagraph", {
                    highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                })}
            </p>
            <p className="leading-relaxed">
                {t.rich("otherTechnologiesParagraph", {
                    highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                })}
            </p>
        </BentoContainer>
    );
}