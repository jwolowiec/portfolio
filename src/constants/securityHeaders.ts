const isDev = process.env.NODE_ENV === 'development';
const isHostedProd = process.env.IS_HOSTED === 'true';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com ${isDev ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://challenges.cloudflare.com;
    ${isDev ? "connect-src 'self' ws: wss:;" : ""} 
    ${isHostedProd ? "upgrade-insecure-requests;" : ""}
`.replace(/\s{2,}/g, ' ').trim();

const baseHeaders = [
    { key: "Content-Security-Policy", value: cspHeader },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-XSS-Protection", value: "0" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()" },
    { key: "X-DNS-Prefetch-Control", value: "off" }
];

const strictHostedHeaders = [
    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-site" }
];

export const securityHeaders = isHostedProd
    ? [...baseHeaders, ...strictHostedHeaders]
    : baseHeaders;