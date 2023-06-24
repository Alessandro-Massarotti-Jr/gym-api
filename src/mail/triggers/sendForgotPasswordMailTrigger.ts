import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Mail } from "..";

export function sendForgotPasswordMail(password: string, userEmail: string): Promise<SMTPTransport.SentMessageInfo> {
    const verifictionCodeMail = new Mail();
    verifictionCodeMail.setSubject("Sua nova senha Lorde App");
    verifictionCodeMail.setTo([{ mail: userEmail }]);

    const app_name = process.env.APP_NAME ?? 'Lord App'

    return verifictionCodeMail.sendView("/forgotPasswordMail.ejs", {
        app_name, password, user_email: userEmail
    });
}