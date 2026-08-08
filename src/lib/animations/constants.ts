export const duration = {
    none: 0,
    micro: 0.02,
    fast: 0.1,
    short: 0.2,
    medium: 0.4,
    long: 0.6,
    xl: 0.8,
} as const;

export const transition = {
    fast: { duration: duration.medium, ease: "easeInOut" },
    default: { duration: duration.long, ease: "easeInOut" },
    slow: { duration: duration.xl, ease: "easeInOut" },
    spring: { type: "spring", duration: duration.medium, bounce: 0.5 }
} as const;

export const viewport = {
    short: 0.2,
    medium: 0.4,
    long: 0.6,
    xl: 0.8,
} as const;