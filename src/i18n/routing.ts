import {defineRouting} from 'next-intl/routing';
import {locales, defaultLocale} from "@/constants/locales";

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
    localeCookie: false
});