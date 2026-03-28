"use client";

import React, {useEffect, useState} from "react";

type PrefixTypes = "phone" | "mail";

interface EncodedLinkProps {
    className?: string;
    type: PrefixTypes;
    encodedText: string;
    label?: string;
}

const prefixes: Record<PrefixTypes, string> = {
    phone: "tel:",
    mail: "mailto:"
};

const formatPhone = (phone: string) => {
    return `+48 ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
};

export default function EncodedLink({className = "", type, encodedText, label}: EncodedLinkProps) {
    const [href, setHref] = useState<string>("#");
    const [displayText, setDisplayText] = useState<string>("");

    useEffect(() => {
        const decodeText = () => {
            const decodedText = atob(encodedText);
            setHref(`${prefixes[type]}${decodedText}`);

            if (label) {
                setDisplayText(label);
            } else if (type === "phone") {
                setDisplayText(formatPhone(decodedText));
            } else {
                setDisplayText(decodedText);
            }

        };

        decodeText();
    }, [encodedText, label, type]);

    return (
        <a href={href} className={className}>
            {displayText}
        </a>
    );
};