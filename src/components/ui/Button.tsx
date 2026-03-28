import React from "react";
import Link, {LinkProps} from "next/link";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonShape = "pill" | "circle";

interface BaseProps{
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
    className?: string;
    children?: React.ReactNode;
}

interface LinkTypes extends BaseProps, LinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>{
    href: string
}

interface ButtonTypes extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement>{
    href?: never
}

type ButtonProps = LinkTypes | ButtonTypes;

const pillPaddings: Record<ButtonSize, string> = {
    xs: "px-3 py-1",
    sm: "px-4 py-1.5",
    md: "px-5 py-2",
    lg: "px-6 py-2.5",
    xl: "px-8 py-3",
};

const circlePaddings: Record<ButtonSize, string> = {
    xs: "p-1.5",
    sm: "p-2",
    md: "p-3",
    lg: "p-3.5",
    xl: "p-4",
};

const variants: Record<ButtonVariant, string> = {
      primary: "text-green-400 bg-green-500/10 border border-green-500/30 rounded-full hover:scale-105",
      secondary: "text-neutral-200 bg-neutral-800/10 border border-neutral-500 rounded-full hover:scale-105",
      link: "text-green-400 underline",
};

const sizes: Record<ButtonSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
};

const baseStyles = "inline-flex items-center justify-center text-center font-medium transition-all duration-200 cursor-pointer";

export default function Button(props: ButtonProps) {
    const variant = props.variant || "primary";
    const size = props.size || "md";
    const shape = props.shape || "pill";
    const customClasses = props.className || "";

    const shapeClasses = variant !== "link"
        ? (shape === "pill" ? pillPaddings[size] : circlePaddings[size])
        : "";

    const combinedClasses = `${baseStyles} ${customClasses} ${variants[variant]} ${sizes[size]} ${shapeClasses}`;

    if (props.href !== undefined) {
        const {
            variant: _v,
            size: _s,
            shape: _sh,
            children,
            className: _c,
            ...linkProps
        } = props;
        return (
            <Link className={combinedClasses} {...linkProps}>
                {children}
            </Link>
        );
    }

    const {
        variant: _v,
        size: _s,
        shape: _sh,
        children,
        className: _c,
        ...buttonProps
    } = props;

    return (
        <button className={combinedClasses} {...buttonProps}>
            {children}
        </button>
    );
}