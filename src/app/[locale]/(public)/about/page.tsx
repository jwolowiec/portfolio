import {setRequestLocale} from "next-intl/server";
import {use} from "react";
import ImageSection from "./_components/ImageSection";
import AboutMeSection from "./_components/AboutMeSection";
import EducationSection from "./_components/EducationSection";
import HorizonsSection from "./_components/HorizonsSection";
import AfterHoursSection from "./_components/AfterHoursSection";
import DocumentsSection from "./_components/DocumentsSection";
import {useTranslations} from "next-intl";

export default function Page({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = use(params);

    setRequestLocale(locale);

    const t = useTranslations("aboutPage");

    return (
        <>
            <h1 className="sr-only">{t("header")}</h1>
            <ImageSection />

            <AboutMeSection />

            <EducationSection />

            <HorizonsSection />

            <AfterHoursSection />

            <DocumentsSection />
        </>
    );
}
