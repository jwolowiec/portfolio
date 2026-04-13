"use client";

import React, {useEffect, useEffectEvent, useState} from "react";
import { createPortal } from "react-dom";

interface ClientPortalProps {
    children: React.ReactNode;
}

export default function ClientPortal({ children }: ClientPortalProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    const isClient = useEffectEvent((mounted: boolean) => {
        setMounted(mounted)
    })

    useEffect(() => {
        isClient(true);

        return () => {
            isClient(false);
        }
    }, []);

    if (!mounted) return null;

    return createPortal(children, document.body);
}