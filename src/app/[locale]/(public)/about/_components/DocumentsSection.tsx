import BentoContainer from "@/components/ui/BentoContainer";
import {useMessages, useTranslations} from "next-intl";

export default function DocumentsSection() {
    const t = useTranslations("aboutPage.DocumentsSection");

    const messages = useMessages();
    const certificateKeys = Object.keys(messages.aboutPage.DocumentsSection.certificates.items);
    const languageKeys = Object.keys(messages.aboutPage.DocumentsSection.languages.items);

    return (
        <BentoContainer id="docs" className="row-span-1 col-span-full flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-medium">{t("header")}</h2>

            <hr className="border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-green-400 text-lg">{t("certificates.header")}</h3>
                    <ul className="space-y-2 text-neutral-300">
                        {certificateKeys.map((key) => {
                            return (
                                <li key={key} className="flex flex-col">
                                    <span className="font-medium">{t(`certificates.items.${key}.title`)}</span>
                                    <span
                                        className="text-sm text-neutral-500">{t(`certificates.items.${key}.subtitle`)}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-green-400 text-lg">Języki obce</h3>
                    <ul className="flex flex-col gap-1">
                        {languageKeys.map((key) => {
                            return (
                                <li key={key}>
                                    {t(`languages.items.${key}.name`)} - <span
                                    className="text-neutral-400">{t(`languages.items.${key}.level`)}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </BentoContainer>
    );
}