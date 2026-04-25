import {beforeEach, describe, vi, it, expect} from "vitest";
import {contactFormAction} from "@/actions/contact-form/contactFormAction";
import {sendMail} from "@/lib/mail/sendMail";
import {verifyTurnstileToken} from "@/lib/turnstile/verify";
import {logger} from "@/lib/logger/logger";
import {SentMessageInfo} from "nodemailer";

vi.mock('@/lib/mail/sendMail', () => ({
    sendMail: vi.fn(),
}));

vi.mock('@/lib/logger/logger', () => ({
    logger: {
        error: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
    }
}));

vi.mock('@/lib/turnstile/verify', () => ({
    verifyTurnstileToken: vi.fn(),
}));

describe("contactFormAction", () => {
    const validFormData = {
        email: "test@domain.com",
        subject: "Test subject",
        content: "Longer message for content validation",
        token: "valid-turnstile-token"
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("fields validation", () => {
        it('should return errors messages for invalid form data', async () => {
            const invalidFormData = {
                ...validFormData,
                email: "invalid-email"
            };

            const result = await contactFormAction(invalidFormData);

            expect(result.success).toBe(false);
            expect(result.errors).toHaveProperty('email');
            expect(verifyTurnstileToken).not.toHaveBeenCalled();
            expect(sendMail).not.toHaveBeenCalled();
        });
    });

    describe("token verification", () => {
        it('should return token error message for invalid token', async () => {
            vi.mocked(verifyTurnstileToken).mockResolvedValue({ success: false, "error-codes": ["600000"] });

            const result = await contactFormAction(validFormData);

            expect(result).toEqual({
                success: false,
                errors: {
                    token: ["invalidToken"],
                },
            });

            expect(verifyTurnstileToken).toHaveBeenCalled();
            expect(sendMail).not.toHaveBeenCalled();
        });
    });

    describe("get unexpected error", () => {
        it('should log error and return generic message when token verification throws unexpected error', async () => {
            const simulatedError = new Error("Turnstile error");
            vi.mocked(verifyTurnstileToken).mockRejectedValue(simulatedError);

            const result = await contactFormAction(validFormData);

            expect(result).toEqual({
                success: false,
                message: "error"
            });

            expect(logger.error).toHaveBeenCalledTimes(1);
            expect(logger.error).toHaveBeenCalledWith("Server error:", simulatedError);

            expect(sendMail).not.toHaveBeenCalled();
        });

        it('should return error message when mail delivery throw unexpected error', async () => {
            const simulatedError = new Error("Mail delivery error");
            vi.mocked(verifyTurnstileToken).mockResolvedValue({success: true, "error-codes": []});
            vi.mocked(sendMail).mockRejectedValue(simulatedError);

            const result = await contactFormAction(validFormData);

            expect(result).toEqual({
                success: false,
                message: "error"
            });

            expect(logger.error).toHaveBeenCalledTimes(1);
            expect(logger.error).toHaveBeenCalledWith("Server error:", simulatedError);
            expect(verifyTurnstileToken).toHaveBeenCalled();
            expect(sendMail).toHaveBeenCalled();
        });
    });

    describe("successful form submission", () => {
        it('should send email and return success', async () => {
            vi.mocked(verifyTurnstileToken).mockResolvedValue({ success: true, "error-codes": [] });
            vi.mocked(sendMail).mockResolvedValue(undefined as SentMessageInfo);

            const result = await contactFormAction(validFormData);

            expect(result).toEqual({ success: true });
            expect(verifyTurnstileToken).toHaveBeenCalledWith(validFormData.token);

            expect(sendMail).toHaveBeenCalledWith({
                replyTo: validFormData.email,
                subject: validFormData.subject,
                text: validFormData.content
            });
        });
    });
});