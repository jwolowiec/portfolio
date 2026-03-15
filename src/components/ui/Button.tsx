import React from "react";
import Link, {LinkProps} from "next/link";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface BaseProps{
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children?: React.ReactNode;
}

interface LinkTypes extends BaseProps, LinkProps{
    href: string
}

interface ButtonTypes extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement>{
    href?: never
}

type ButtonProps = LinkTypes | ButtonTypes;

const variants: Record<ButtonVariant, string> = {
      primary: "px-5 py-1 text-green-400 bg-green-500/10 border border-green-500/30 rounded-full hover:scale-105",
      secondary: "px-5 py-1 text-neutral-200 bg-neutral-800/10 border border-neutral-500 rounded-full hover:scale-105",
      link: "text-green-400 underline",
}

const sizes: Record<ButtonSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
}

const baseStyles = "inline-flex items-center justify-center text-center font-medium transition-all duration-200 cursor-pointer";

export default function Button(props: ButtonProps) {
    const variant = props.variant || "primary";
    const size = props.size || "md";
    const customClasses = props.className || "";
    const combinedClasses = `${baseStyles} ${customClasses} ${variants[variant]} ${sizes[size]}`;

    if (props.href !== undefined) {
        const { variant: _v, children, className: _c, ...linkProps } = props;
        return (
            <Link className={combinedClasses} {...linkProps}>
                {children}
            </Link>
        );
    }

    const { variant: _v, children, className: _c, ...buttonProps } = props;

    return (
        <button className={combinedClasses} {...buttonProps}>
            {children}
        </button>
    );
}