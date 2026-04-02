import React from "react";

interface FooterColumnProps {
    title: string;
    children: React.ReactNode;
}

export default function FooterColumn({title, children}: FooterColumnProps) {
    return (
        <div className="flex flex-col">
            <h3 className="text-lg mb-2 text-neutral-200">{title}</h3>
            {children}
        </div>
    );
}