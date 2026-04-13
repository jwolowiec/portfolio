import React from "react";
import Link, {LinkProps} from "next/link";
import {ButtonShape, ButtonSize, ButtonVariant, theme} from "./styles";

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

export default function Button(props: ButtonProps) {
    const {
        variant = "primary",
        size = "md",
        shape = "pill",
        className = "",
        children,
        ...specificProps
    } = props;

    const isButton = variant !== "link";
    const currentSize = theme.sizes[size];

    const combinedClasses = [
        theme.base,
        theme.variants[variant],
        currentSize.text,
        isButton && currentSize.padding[shape],
        isButton && theme.shapes[shape],
        className
    ].filter(Boolean).join(" ");

    if (props.href !== undefined) {
        return (
            <Link className={combinedClasses} {...(specificProps as Omit<LinkTypes, keyof BaseProps>)}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...(specificProps as Omit<ButtonTypes, keyof BaseProps>)}>
            {children}
        </button>
    );
}