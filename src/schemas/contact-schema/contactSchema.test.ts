import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ContactSchema, formLimits } from "./contactSchema";

describe("contactSchema", () => {
    const validData = {
        email: "test@domain.com",
        subject: "Valid subject value",
        content: "Valid content value",
        token: "valid-turnstile-token"
    };

    describe("validation", () => {
        it.each`
        field        | invalidValue                                  | expectedErrorMessage
        ${"email"}   | ${"test@.com"}                                | ${"invalidEmail"}
        ${"email"}   | ${""}                                         | ${"missingEmail"}
        ${"subject"} | ${""}                                         | ${"shortSubject"}
        ${"subject"} | ${"a".repeat(formLimits.subject.max + 1)}    | ${"longSubject"}
        ${"content"} | ${""}                                         | ${"shortContent"}
        ${"content"} | ${"a".repeat(formLimits.content.max + 1)}    | ${"longContent"}
        ${"token"}   | ${""}                                         | ${"missingToken"}
    `(
            "should return $expectedErrorMessage error for $field",
            ({ field, invalidValue, expectedErrorMessage }) => {
                const dataToTest = {
                    ...validData,
                    [field]: invalidValue
                };

                const result = ContactSchema.safeParse(dataToTest);

                expect(result.success).toBe(false);

                if (!result.success) {
                    const fieldErrors = z.flattenError(result.error).fieldErrors;
                    const actualErrorMessage = fieldErrors[field as keyof typeof fieldErrors]?.[0];

                    expect(actualErrorMessage).toBe(expectedErrorMessage);
                }
            }
        );
    });

    describe("with valid data", () => {
        it("should successfully parse data and return true", () => {
            const result = ContactSchema.safeParse(validData);

            expect(result.success).toBe(true);
        });

        it("should trim whitespaces from email during parsing", () => {
            const dataWithUntrimmedEmail = {
                ...validData,
                email: `     ${validData.email}      `
            };

            const result = ContactSchema.safeParse(dataWithUntrimmedEmail);

            expect(result.success).toBe(true);

            if (result.success) {
                expect(result.data.email).toBe(validData.email);
            }
        });
    });
});