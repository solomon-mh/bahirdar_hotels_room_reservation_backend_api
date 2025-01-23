import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { envConfig } from '../config/environment.config';

interface IEmailOptions {
  email: string;
  subject: string;
  message: string;
  html: string;
}
const sendEmail = async (options: IEmailOptions) => {
  let transporter: Transporter;
  if (envConfig.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: envConfig.SENDGRID_USERNAME,
        pass: envConfig.SENDGRID_PASSWORD,
      },
    });
  } else {
    const smtpOptions: SMTPTransport.Options = {
      host: envConfig.EMAIL_HOST,
      port: envConfig.EMAIL_PORT, // Port must be a number
      auth: {
        user: envConfig.EMAIL_USERNAME,
        pass: envConfig.EMAIL_PASSWORD,
      },
    };

    transporter = nodemailer.createTransport(smtpOptions);
  }

  const mailOptions = {
    from: envConfig.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
