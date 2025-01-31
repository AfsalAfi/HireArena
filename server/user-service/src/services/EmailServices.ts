import nodemailer from "nodemailer";
import { IEmailService } from "../interfaces/IEmailService";

class EmailService implements IEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ahammedijas7885@gmail.com",
        pass: "wsau wond lzgf xowd",
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    try {
      const verificationUrl = `${process.env.FRONT_END_URL}/auth/verify-email/${token}`;
      const message = `<p>Dear [User's Name],</p>

        <p>Thank you for joining <strong>HireArena</strong>! We're excited to have you on board as you take the next steps toward landing your dream job.</p>

        <p>Before you can start using all the features of our platform, we need to verify your email address. Please click the link below to confirm your email:</p>

        <p style="text-align: center; margin-top: 50px; margin-bottom: 50px;">
          <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Your Email</a>
        </p>

        <p>If you did not request this verification, please ignore this email or contact our support team at <a href="mailto:support@hirearena.com">support@hirearena.com</a>.</p>

        <p>We look forward to helping you unlock new career opportunities at <strong>HireArena</strong>!</p>

        <p>Best regards,</p>
        <p>The HireArena Team</p>

        <p style="font-size: 12px; color: #888;">If you're having trouble clicking the button, use this link: <a href="${verificationUrl}">${verificationUrl}</a></p>

      `;

      console.log(verificationUrl);

      // await this.transporter.sendMail({
      //   to: email,
      //   subject: "Email Verification",
      //   html: message,
      // });
    } catch (error) {
      console.log(error);
    }
  }
}

export default EmailService;
