import "server-only";
import {headers} from "next/headers";

export interface TurnstileResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    "error-codes": string[];
    action?: string;
    cdata?: string;
}

export const verifyTurnstileToken = async (token: string): Promise<TurnstileResponse> => {
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecret) {
        throw new Error("Missing or wrong secret turnstile token");
    }

    const formData = new FormData();
    formData.append("secret", turnstileSecret);
    formData.append("response", token);

    const headersList = await headers();

    const realIp = headersList.get("x-real-ip");
    const forwardedIp = headersList.get("x-forwarded-for")?.split(",")[0].trim();
    const ip = realIp || forwardedIp;

    if (ip) {
        formData.append("remoteip", ip);
    }

    const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: formData,
        },
    );

    if (!response.ok) {
        throw new Error(`Turnstile API responded with status: ${response.status}`);
    }

    return response.json();
};