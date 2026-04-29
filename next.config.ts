import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {securityHeaders} from "@/constants/securityHeaders";

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);