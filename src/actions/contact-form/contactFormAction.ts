"use server";

import {ContactFormData, ContactSchema} from "@/schemas/contact-schema/contactSchema";
import {ActionResponse} from "@/types/actions";
import {z} from "zod";
import {sendMail} from "@/lib/mail/sendMail";
import {logger} from "@/lib/logger/logger";
import {verifyTurnstileToken} from "@/lib/turnstile/verify";

export const contactFormAction = async ({email, subject, content, token}: ContactFormData): Promise<ActionResponse<ContactFormData>> => {
    const validation = ContactSchema.safeParse({email, subject, content, token});

    if (!validation.success) {
        return {
            success: false,
            errors: z.flattenError(validation.error).fieldErrors
        }
    }

    try {
        const data = await verifyTurnstileToken(token);

        if (!data.success) {
            return {
                success: false,
                errors: {
                    token: ["invalidToken"],
                },
            };
        }

        await sendMail({
            replyTo: email,
            subject,
            text: content
        });

        return {
            success: true,
        }
    } catch (error) {
        logger.error("Server error:", error);

        return {
            success: false,
            message: "error"
        }
    }
};