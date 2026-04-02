"use client";

import {locales} from "@/constants/locales";
import {Link, usePathname} from "@/i18n/navigation";
import {useLocale, useTranslations} from "next-intl";

export default function LocalesList() {
    const currentLocale = useLocale();
    const path = usePathname();
    const localesT = useTranslations("common.Locales");

    return (
        <ul className="flex flex-row items-center divide-x divide-neutral-500">
            {locales.map((locale) => {
                const current = locale === currentLocale;
                return (
                    <li key={locale}>
                        <Link
                            href={path}
                            locale={locale}
                            className={`text-base px-4 ${current ? "text-green-400" : "text-neutral-400 hover:text-white"}`}
                        >
                            {localesT(`${locale}.name`)}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}