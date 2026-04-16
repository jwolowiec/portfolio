import React, {useId} from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    label: string
    hideLabel?: boolean;
    hint?: string;
    length?: number;
    error?: string;
}

export default function Textarea({name, id, label, hideLabel = false, hint, length, error, maxLength, ...props}: TextareaProps) {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;

    const describedBy = [error ? errorId : "", hint ? hintId : ""]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={textareaId}
                className={`${error ? "text-red-500" : ""} ${hideLabel ? "sr-only" : "pl-3 text-base"}`}
            >
                {label}
            </label>
            <textarea
                name={name}
                id={textareaId}
                aria-describedby={describedBy}
                aria-invalid={!!error}
                {...props}
                className={`
                    bg-neutral-950 p-3 rounded-xl outline-none transition-colors duration-200
                    text-neutral-200 placeholder:text-neutral-600 border
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error
                    ? "border-red-900 focus:border-red-500"
                    : "border-neutral-800 focus:border-green-500/30"}
                `}
            />
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                    {error &&
                        <p id={errorId} className="pl-3 text-sm text-red-500">{error}</p>
                    }
                    {hint &&
                        <p id={hintId} className="pl-3 text-sm text-neutral-500">{hint}</p>
                    }
                </div>
                {maxLength && length !== undefined &&
                    <p className="pr-3 text-sm text-neutral-500">{length} / {maxLength}</p>
                }
            </div>
        </div>
    );
}