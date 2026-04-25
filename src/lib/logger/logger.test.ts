import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { logger } from "./logger";

vi.mock('server-only', () => ({}));

describe('logger', () => {
    const MOCK_TIME = new Date('2026-04-24T12:00:00.000Z');

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(MOCK_TIME);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    describe('info', () => {
        it('should log correctly without data', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

            logger.info("Test message");

            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(
                "[INFO] 2026-04-24T12:00:00.000Z - Test message",
                ""
            );
        });

        it('should log correctly with data payload', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
            const testData = { userId: 123 };

            logger.info("Test message", testData);

            expect(consoleSpy).toHaveBeenCalledWith(
                "[INFO] 2026-04-24T12:00:00.000Z - Test message",
                testData
            );
        });
    });

    describe('error', () => {
        it('should log correctly without error object', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            logger.error("Something failed");

            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(
                "[ERROR] 2026-04-24T12:00:00.000Z - Something failed",
                ""
            );
        });

        it('should log correctly with error object', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const errorObj = new Error("DB connection lost");

            logger.error("Something failed", errorObj);

            expect(consoleSpy).toHaveBeenCalledWith(
                "[ERROR] 2026-04-24T12:00:00.000Z - Something failed",
                errorObj
            );
        });
    });

    describe('warn', () => {
        it('should log correctly without data', () => {
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            logger.warn("Watch out");

            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(
                "[WARN] 2026-04-24T12:00:00.000Z - Watch out",
                ""
            );
        });

        it('should log correctly with data payload', () => {
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const testData = ["ip_mismatch", "retry_limit_reached"];

            logger.warn("Watch out", testData);

            expect(consoleSpy).toHaveBeenCalledWith(
                "[WARN] 2026-04-24T12:00:00.000Z - Watch out",
                testData
            );
        });
    });
});