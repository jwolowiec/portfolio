"use client";

import NextImage, {ImageProps} from "next/image";
import {useState} from "react";

interface CustomImageProps extends Omit<ImageProps, "src"> {
    src: string | undefined;
    fallbackSrc?: string;
}

export default function Image({src, fallbackSrc = "/placeholder.png", alt, ...rest}: CustomImageProps) {
    const [hasError, setHasError] = useState<boolean>(false);
    const currentSrc = hasError || !src ? fallbackSrc : src;

    return (
        <NextImage
            src={currentSrc}
            alt={alt}
            onError={() => {
                if (!hasError) setHasError(true);
            }}
            {...rest}
        />
    );
}