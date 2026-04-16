import "server-only";
import {transporter} from "@/lib/mail/transporter";
import {personalInfo} from "@/constants/personalInfo";

interface SendMailProps {
    to?: string;
    replyTo?: string;
    subject: string;
    text: string;
    html?: string;
}

export const sendMail = ({to, replyTo, subject, text, html = ""}: SendMailProps) => {
    return transporter.sendMail({
        from: `"${personalInfo.name} ${personalInfo.surname}" <${process.env.SMTP_USER}>`,
        to: to || process.env.MAIL_RECEIVER,
        replyTo,
        subject,
        text,
        html,
    });
};