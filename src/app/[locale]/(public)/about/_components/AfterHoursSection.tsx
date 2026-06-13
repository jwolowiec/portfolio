import {IoFootballOutline, IoGameControllerOutline} from "react-icons/io5";
import {FaJediOrder} from "react-icons/fa6";
import BentoContainer from "@/components/ui/BentoContainer";
import {useTranslations} from "next-intl";

export default function AfterHoursSection() {
    const t = useTranslations("aboutPage.AfterHoursSection");

    return (
        <BentoContainer className="row-span-2 col-span-full md:col-span-3 lg:col-span-4 flex flex-col gap-4">
            <h2 className="text-2xl font-medium">{t("header")}</h2>

            <hr className="border-neutral-800 group-hover:border-green-500/30 transition-colors duration-300"/>

            <p className="leading-relaxed">
                {t.rich("paragraph", {
                    highlight: (chunk) => <span className="text-green-400 font-semibold">{chunk}</span>
                })}
            </p>

            <div className="flex flex-col gap-1">
                <h3 className="text-green-400 text-lg">{t("hobbies.header")}</h3>
                <ul>
                    <li className="flex flex-row gap-2 items-center">
                        <IoFootballOutline className="text-green-400"/>
                        {t("hobbies.football")}
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <IoGameControllerOutline className="text-green-400"/>
                        {t("hobbies.videoGames")}
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaJediOrder className="text-green-400"/>
                        {t("hobbies.starWars")}
                    </li>
                </ul>
            </div>
        </BentoContainer>
    );
}