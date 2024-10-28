import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
    emailFrom: string;
    emailTo: string;
    subject: string;
    html: string;
}

const mailService = {
    async sendEmail({ emailFrom, emailTo, subject, html }: EmailOptions): Promise<{ message: string; messageId?: string }> {
        console.log("====", process.env.EMAIL_USER, process.env.PASSWORD_USER);
        
        const transporter: Transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT), 
            secure: process.env.SMTP_SECURE === 'true', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD_USER,
            },
        });

        try {
            let info = await transporter.sendMail({
                from: emailFrom,
                to: emailTo,
                subject: subject,
                html: html,
            });
            console.log('Email sent: %s', info.messageId);
            return { message: 'Email sent successfully', messageId: info.messageId };
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
};

export { mailService };
