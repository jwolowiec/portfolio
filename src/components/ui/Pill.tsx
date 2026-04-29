import React from "react";
import {ThemeColor} from "@/types/theme";

interface PillProps{
    children: React.ReactNode;
    color?: ThemeColor;
}

const colorVariants: Record<ThemeColor, string> = {
    green: "bg-green-500/10 border-green-500/30 text-green-400",
    neutral: "bg-neutral-500/10 border-neutral-500/30 text-neutral-400",
}

export default function Pill({children, color = "neutral"}: PillProps){
    return (
        <div
            className={`
                w-fit inline-flex items-center justify-center
                text-xs rounded-full px-3 py-1 border
                ${colorVariants[color]}`}
        >
            {children}
        </div>
    );
}