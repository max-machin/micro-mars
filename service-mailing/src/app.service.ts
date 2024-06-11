/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailingService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: '"Micro Mars" <user@examplemail.com>',
      to: to,
      subject: subject,
      text: body,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email successfully sent to ${to} - Subject: ${subject}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}`, error.stack);
    }
  }
}
