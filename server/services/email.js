import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // kailash.nmims@gmail.com
    pass: process.env.EMAIL_PASSWORD // Your Gmail App Password
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"MCX Price Alert" <kailash.nmims@gmail.com>',
      to,
      subject,
      text,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">MCX Price Alert</h2>
          <p style="font-size: 16px; line-height: 1.5;">${text}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            This is an automated alert from your MCX Price Tracker
          </p>
        </div>
      `
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email');
  }
};
