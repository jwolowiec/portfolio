import { describe, expect, it, vi, beforeEach } from 'vitest';
import { sendMail } from "./sendMail";
import { transporter } from "./transporter";

vi.mock('server-only', () => ({}));

vi.mock('./transporter', () => ({
    transporter: {
        sendMail: vi.fn()
    }
}));

vi.mock('@/constants/personalInfo', () => ({
    personalInfo: { name: "John", surname: "Doe" }
}));

describe('sendMail', () => {
    beforeEach(() => {
        vi.unstubAllEnvs();
        vi.mocked(transporter.sendMail).mockClear();
    });

    it('should use default MAIL_RECEIVER when "to" is not provided', async () => {
        vi.stubEnv("SMTP_USER", "example@domain.com");
        vi.stubEnv("MAIL_RECEIVER", "private@domain.com");

        await sendMail({
            subject: "Test",
            text: "Hello"
        });

        expect(transporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                to: "private@domain.com",
                from: '"John Doe" <example@domain.com>'
            })
        );
    });
});