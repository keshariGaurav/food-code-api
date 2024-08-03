import nodemailer, { Transporter } from 'nodemailer';
import EmailTemplate from './emailTemplate';
import { templates } from './templates';

interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

class Email {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    private async sendMail(options: EmailOptions): Promise<void> {
        const mailOptions = {
            from: 'Easy Eats',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        await this.transporter.sendMail(mailOptions);
    }

    public async sendTemplatedEmail(
        templateName: keyof typeof templates,
        to: string,
        data: { [key: string]: string }
    ): Promise<void> {
        const template = new EmailTemplate(templateName);
        const subject = template.getSubject(data);
        const text = template.getText(data);
        const html = template.getHtml(data);
        await this.sendMail({ to, subject, text, html });
    }
}

export default Email;
