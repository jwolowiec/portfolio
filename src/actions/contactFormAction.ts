"use server";

import {ContactFormData, ContactSchema} from "@/schemas";
import {ActionResponse} from "@/types";
import {z} from "zod";
import {sendMail} from "@/lib/mail";
import {logger} from "@/lib/logger";

export const contactFormAction = async ({email, subject, content}: ContactFormData): Promise<ActionResponse<ContactFormData>> => {
    const result = ContactSchema.safeParse({email, subject, content});

    if (!result.success) {
        return {
            success: false,
            errors: z.flattenError(result.error).fieldErrors
        }
    }

    try {
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
        logger.error("SMTP server error:", error);

        return {
            success: false,
            message: "error"
        }
    }
};