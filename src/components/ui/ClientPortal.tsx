"use client";

import React, {useSyncExternalStore} from "react";
import { createPortal } from "react-dom";

interface ClientPortalProps {
    children: React.ReactNode;
}

export default function ClientPortal({ children }: ClientPortalProps) {
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    if (!mounted) return null;

    return createPortal(children, document.body);
}