import Image from "next/image";
import mainImg from "@public/main-img.jpg";
import BentoContainer from "@/components/ui/BentoContainer";
import {useTranslations} from "next-intl";

export default function ImageSection() {
    const t = useTranslations("aboutPage.ImageSection");

    return (
        <BentoContainer
            className="row-span-2 col-span-full md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center gap-4">
            <Image
                className="border-3 border-green-500/30 w-56 h-56 md:w-64 md:h-64 rounded-full object-cover object-top"
                src={mainImg}
                alt={`Jakub Wołowiec - ${t("photo")}`}
                loading="eager"
                sizes="(min-width: 768px) 256px, 192px"
            />
            <h2 className="text-3xl lg:text-4xl font-bold group-hover:text-green-400 transition-colors duration-400">
                Jakub Wołowiec
            </h2>
        </BentoContainer>
    );
}