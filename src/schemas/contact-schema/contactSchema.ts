import * as z from "zod";

export const formLimits = {
    subject: { min: 1, max: 100 },
    content: { min: 1, max: 500 },
} as const;

export const ContactSchema = z.object({
    email: z.string()
        .trim()
        .min(1, "missingEmail")
        .pipe(z.email("invalidEmail")),
    subject: z.string()
        .min(formLimits.subject.min, "shortSubject")
        .max(formLimits.subject.max, "longSubject"),
    content: z.string()
        .min(formLimits.content.min, "shortContent")
        .max(formLimits.content.max, "longContent"),
    token: z.string({
        error: (iss) => !iss.input ? "missingToken" : undefined
    }).min(1, "missingToken")
});

export type ContactFormData = z.infer<typeof ContactSchema>;