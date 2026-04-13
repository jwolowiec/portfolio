import React, {useId} from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    type: string;
    name: string;
    label: string
    hideLabel?: boolean;
    hint?: string;
    error?: string;
}

export default function Input({type, name, id, label, hideLabel = false, hint, error, ...props}: InputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const describedBy = [error ? errorId : "", hint ? hintId : ""]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={inputId}
                className={`${error ? "text-red-500" : ""} ${hideLabel ? "sr-only" : "pl-3 text-base"}`}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={inputId}
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
            {error &&
                <p id={errorId} className="pl-3 text-sm text-red-500">{error}</p>
            }
            {hint &&
                <p id={hintId} className="pl-3 text-sm text-neutral-500">{hint}</p>
            }
        </div>
    );
}