import {describe, expect, it, vi, beforeEach} from 'vitest';
import {verifyTurnstileToken} from "@/lib/turnstile/verify";
import {headers} from "next/headers";

vi.mock('server-only', () => ({}));
vi.mock('next/headers', () => ({
    headers: vi.fn()
}));

function setupHeaders(ips: { real?: string; forwarded?: string }) {
    const mockHeaders = new Headers();
    if (ips.real) mockHeaders.set('x-real-ip', ips.real);
    if (ips.forwarded) mockHeaders.set('x-forwarded-for', ips.forwarded);
    vi.mocked(headers).mockResolvedValue(mockHeaders);
}

describe('verifyTurnstileToken', () => {
    const fetchTurnstile = vi.fn();
    const mockResponse = {
        ok: true,
        json: async () => ({success: true})
    }

    beforeEach(() => {
        vi.stubEnv("TURNSTILE_SECRET_KEY", "test-key");
        fetchTurnstile.mockClear();
        global.fetch = fetchTurnstile;
        fetchTurnstile.mockResolvedValue(mockResponse);
    });

    describe('when TURNSTILE_SECRET_KEY is missing', () => {
        beforeEach(() => {
            vi.unstubAllEnvs();
        });

        it('should throw an error if the key is an empty string', async () => {
            vi.stubEnv("TURNSTILE_SECRET_KEY", "");
            await expect(verifyTurnstileToken('token')).rejects.toThrow("Missing or wrong secret turnstile token");
        });

        it('should throw an error if the key is undefined', async () => {
            vi.stubEnv("TURNSTILE_SECRET_KEY", undefined);
            await expect(verifyTurnstileToken('token')).rejects.toThrow("Missing or wrong secret turnstile token");
        });
    });

    describe("call to Cloudflare", () => {
        it('should work with only forwarded IP added to FormData', async () => {
            setupHeaders({ forwarded: '2.2.2.2' });

            await verifyTurnstileToken('token');

            const sentFormData = fetchTurnstile.mock.lastCall![1].body as FormData;
            expect(sentFormData.get('remoteip')).toBe('2.2.2.2');
        });

        it('should work with only real IP added to FormData', async () => {
            setupHeaders({ real: '1.1.1.1' });

            await verifyTurnstileToken('token');

            const sentFormData = fetchTurnstile.mock.lastCall![1].body as FormData;
            expect(sentFormData.get('remoteip')).toBe('1.1.1.1');
        });

        it('should work with forwarded and real ip present in headers', async () => {
            setupHeaders({ real: '1.1.1.1', forwarded: '2.2.2.2' });

            await verifyTurnstileToken('token');

            const sentFormData = fetchTurnstile.mock.lastCall![1].body as FormData;
            expect(sentFormData.get('remoteip')).toBe('1.1.1.1');
        });

        it('should work without remoteip if IP headers are missing', async () => {
            setupHeaders({});

            await verifyTurnstileToken('token');

            const sentFormData = fetchTurnstile.mock.lastCall![1].body as FormData;
            expect(sentFormData.has('remoteip')).toBe(false);
        });

        it('should throw error when fetch was not successful', async () => {
            setupHeaders({});

            fetchTurnstile.mockResolvedValue({
                ok: false,
                status: 500
            })

            await expect(verifyTurnstileToken("token")).rejects.toThrow("Turnstile API responded with status: 500");
        });

        it('should throw error when Cloudflare is unavailable', async () => {
            setupHeaders({});

            fetchTurnstile.mockRejectedValue({})

            await expect(verifyTurnstileToken("token")).rejects.toThrow();
        });
    });

    it('should return JSON and call correct endpoint', async () => {
        setupHeaders({});

        const result = await verifyTurnstileToken("token");

        expect(result).toEqual({ success: true });

        expect(fetchTurnstile).toHaveBeenCalledTimes(1);
        expect(fetchTurnstile).toHaveBeenCalledWith(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            expect.any(Object)
        );
    });
});