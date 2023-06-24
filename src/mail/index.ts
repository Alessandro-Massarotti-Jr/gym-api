import SMTPTransport from "nodemailer/lib/smtp-transport";
import { mailer } from "../config/nodemailer";
import ejs from "ejs";
import path from "path";

interface userMails {
  name?: string;
  mail: string;
}

export class Mail {
  private mailer = mailer;
  private to: string = process.env.MAIL_USER as string;
  private subject: string = "";

  async sendView(
    viewPath: string,
    viewData: Object
  ): Promise<SMTPTransport.SentMessageInfo> {
    const viewsFolder = path.join(__dirname, "../../views/mail");
    const view = await ejs.renderFile(
      path.join(viewsFolder, viewPath),
      viewData
    );

    return this.mailer.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: this.to,
      subject: `[${process.env.APP_NAME}] ${this.subject}`,
      html: view,
    });
  }

  sendMessage(message: string): Promise<SMTPTransport.SentMessageInfo> {
    return mailer.sendMail({
      from: `${process.env.APP_NAME} <${process.env.MAIL_USER}>`,
      to: this.to,
      subject: `[${process.env.APP_NAME}] ${this.subject}`,
      text: message,
    });
  }

  setTo(mails: userMails[]): string {
    const users = mails.map((mail) => {
      if (mail.name) {
        return `${mail.name} <${mail.mail}>`;
      } else {
        return mail.mail;
      }
    });
    this.to = users.join(",");
    return this.to;
  }

  setSubject(subject: string): void {
    this.subject = subject;
    return;
  }
}
