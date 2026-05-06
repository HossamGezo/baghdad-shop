// --- Libraries
import nodemailer from "nodemailer";

// --- Send Email Logic
export default async (userEmail: string, subject: string, htmlTemplate: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Baghdad Shop <${process.env.APP_EMAIL_ADDRESS}>`,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Internal Server Error (Email Provider)");
  }
};
