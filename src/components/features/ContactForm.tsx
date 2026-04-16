"use client";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import {useForm, useWatch} from "react-hook-form";
import {ContactFormData, ContactSchema, formLimits} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import React from "react";
import {contactFormAction} from "@/actions/contactFormAction";
import Spinner from "@/components/ui/Spinner";
import {AnimatePresence, motion} from "framer-motion";

interface ContactFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ContactForm({onSuccess, onCancel}: ContactFormProps) {
    const t = useTranslations("forms.contact");
    const tButtons = useTranslations("common.buttons");
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: {errors, isValid, isSubmitting}
    } = useForm<ContactFormData>({
        resolver: zodResolver(ContactSchema),
        mode: "onChange",
    });

    const contentValue = useWatch({
        control,
        name: "content",
        defaultValue: "",
    });

    const onSubmit = async (data: ContactFormData) => {
        const {success, errors, message} = await contactFormAction(data);

        if (success) {
            return onSuccess();
        }

        if (errors) {
            (Object.keys(errors) as Array<keyof ContactFormData>).forEach((key) => {
                const fieldErrors = errors[key];

                if (fieldErrors && fieldErrors.length > 0) {
                    setError(key, {
                        type: "server",
                        message: fieldErrors[0]
                    });
                }
            });

            return;
        }

        if (!success && message) {
            setError("root.serverError", {
                type: "server",
                message
            });
        }
    };

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            <AnimatePresence>
                {errors.root?.serverError && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm mb-4">
                            {t(`message.${errors.root.serverError.message}`)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-col gap-6">
                <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 p-4 rounded-xl text-sm">
                    {t("message.info")}
                </div>
                <Input
                    type="email"
                    {...register("email")}
                    id="email"
                    placeholder="example@domain.com"
                    label={t("label.email")}
                    required
                    autoFocus
                    disabled={isSubmitting}
                    error={errors.email?.message ? t(`error.${errors.email.message}`) : undefined}
                />
                <Input
                    type="text"
                    {...register("subject")}
                    id="subject"
                    label={t("label.subject")}
                    hint={t("hint.subject", {number: formLimits.subject.max})}
                    minLength={formLimits.subject.min}
                    maxLength={formLimits.subject.max}
                    required
                    disabled={isSubmitting}
                    error={errors.subject?.message ? t(`error.${errors.subject.message}`, {number: formLimits.subject.max}) : undefined}
                />
                <Textarea
                    {...register("content")}
                    id="content"
                    label={t("label.content")}
                    hint={t("hint.content", {number: formLimits.content.max})}
                    length={contentValue.length}
                    minLength={formLimits.content.min}
                    maxLength={formLimits.content.max}
                    required
                    disabled={isSubmitting}
                    error={errors.content?.message ? t(`error.${errors.content.message}`, {number: formLimits.content.max}) : undefined}
                />
                <div className="flex flex-col md:flex-row gap-3">
                    <Button
                        shape="rounded"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="relative transition-all duration-200"
                    >
                    <span className={isSubmitting ? "invisible" : ""}>
                        {tButtons("submit")}
                    </span>
                        {isSubmitting && (
                            <span className="absolute inset-0 flex items-center justify-center">
                            <Spinner/>
                        </span>
                        )}
                    </Button>
                    <Button onClick={onCancel} type="button" shape="rounded"
                            variant="secondary">{tButtons("cancel")}</Button>
                </div>
            </div>
        </form>
    )
}