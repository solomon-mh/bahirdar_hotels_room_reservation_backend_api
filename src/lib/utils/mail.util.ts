import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IEmailOptions {
  email: string;
  subject: string;
  message: string;
  html: string;
}
const sendEmail = async (options: IEmailOptions) => {
  let transporter: Transporter;
  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  } else {
    const smtpOptions: SMTPTransport.Options = {
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string, 10), // Port must be a number
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    };

    transporter = nodemailer.createTransport(smtpOptions);
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM as string,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
