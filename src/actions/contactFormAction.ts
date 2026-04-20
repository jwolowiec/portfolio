"use server";

import {ContactFormData, ContactSchema} from "@/schemas";
import {ActionResponse} from "@/types";
import {z} from "zod";
import {sendMail} from "@/lib/mail";
import {logger} from "@/lib/logger";
import {verifyTurnstileToken} from "@/lib/turnstile";

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

        // TODO: Change into sendMail, when form is ready

        await new Promise((resolve) => setTimeout(resolve, 2000));

        // await sendMail({
        //     replyTo: email,
        //     subject,
        //     text: content
        // });

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