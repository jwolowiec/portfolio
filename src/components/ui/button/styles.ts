export type ButtonVariant = "primary" | "secondary" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "pill" | "circle" | "rounded";

const variants: Record<ButtonVariant, string> = {
    primary: "text-green-400 bg-green-500/10 border border-green-500/30 hover:scale-105",
    secondary: "text-neutral-200 bg-neutral-800/10 border border-neutral-500 hover:scale-105",
    link: "text-green-400 underline",
}

const shapes: Record<ButtonShape, string> = {
    pill: "rounded-full",
    circle: "rounded-full",
    rounded: "rounded-xl"
};

type SizeConfig = {
    text: string;
    padding: Record<ButtonShape, string>;
};

const sizes: Record<ButtonSize, SizeConfig> = {
    xs: {
        text: "text-xs",
        padding: { pill: "px-3 py-1", rounded: "px-3 py-1", circle: "p-1.5" }
    },
    sm: {
        text: "text-sm",
        padding: { pill: "px-4 py-1.5", rounded: "px-4 py-1.5", circle: "p-2" }
    },
    md: {
        text: "text-base",
        padding: { pill: "px-5 py-2", rounded: "px-5 py-2", circle: "p-3" }
    },
    lg: {
        text: "text-lg",
        padding: { pill: "px-6 py-2.5", rounded: "px-6 py-2.5", circle: "p-3.5" }
    },
    xl: {
        text: "text-xl",
        padding: { pill: "px-8 py-3", rounded: "px-8 py-3", circle: "p-4" }
    },
};

export const theme = {
    base: "inline-flex items-center justify-center text-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
    variants,
    shapes,
    sizes
} as const;