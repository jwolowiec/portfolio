import {Turnstile, TurnstileInstance, TurnstileProps} from "@marsidev/react-turnstile";
import React, {RefObject} from "react";
import {useTranslations} from "next-intl";

interface TurnstileWidgetProps extends Omit<TurnstileProps, 'siteKey'>{
    ref: RefObject<TurnstileInstance | null>
    error?: string;
}

export default function TurnstileWidget({ref, error, ...props}: TurnstileWidgetProps) {
    const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const t = useTranslations("forms.turnstile")
    const errorId = "turnstile-error";

    if (!turnstileKey) {
        return (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm mb-4">
                {t("error.keyError")}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 pl-3">
            <Turnstile
                ref={ref}
                {...props}
                siteKey={turnstileKey}
                aria-describedby={error ? errorId : undefined}
                aria-invalid={!!error}
            />
            {error &&
                <p id={errorId} className="text-sm text-red-500">{error}</p>
            }
        </div>
    );
}