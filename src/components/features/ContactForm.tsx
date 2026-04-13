import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import {useForm} from "react-hook-form";
import {ContactFormData, ContactSchema, formLimits} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

interface ContactFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ContactForm({onSuccess, onCancel}: ContactFormProps) {
    const t = useTranslations("forms.contact");
    const tButtons = useTranslations("common.buttons");
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<ContactFormData>({
        resolver: zodResolver(ContactSchema),
        mode: "onChange",
    });

    return (
        <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSuccess)}
        >
            <Input
                type="email"
                {...register("email")}
                id="email"
                placeholder="example@domain.com"
                label={t("label.email")}
                required
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
                error={errors.subject?.message ? t(`error.${errors.subject.message}`, {number: formLimits.subject.max}) : undefined}
            />
            <Textarea
                {...register("content")}
                id="content"
                label={t("label.content")}
                hint={t("hint.content", {number: formLimits.content.max})}
                minLength={formLimits.content.min}
                maxLength={formLimits.content.max}
                required
                error={errors.content?.message ? t(`error.${errors.content.message}`, {number: formLimits.content.max}) : undefined}
            />
            <div className="flex flex-col md:flex-row gap-3">
                <Button shape="rounded" type="submit" disabled={!isValid}>{tButtons("submit")}</Button>
                <Button onClick={onCancel} type="button" shape="rounded" variant="secondary">{tButtons("cancel")}</Button>
            </div>
        </form>
    )
}