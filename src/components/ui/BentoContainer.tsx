import React from "react";

interface BentoContainerProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
}

export default function BentoContainer({children, id, className = ""}: BentoContainerProps) {
    return (
        <section
            id={id}
            className={`
                group relative h-full w-full overflow-hidden rounded-2xl 
                bg-neutral-900/80 backdrop-blur-md
                border border-neutral-800
                hover:border-green-500/30
                hover:scale-[1.005] hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300
                p-6
                ${className}
            `}
        >
            {children}
        </section>
    );
}