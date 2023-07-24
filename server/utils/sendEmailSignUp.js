import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

export const sendVerificationCode = async (email, verificationCode) => {
    console.log('UTLIS email, verificationCode', email, verificationCode)
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail", // Use your email service provider here
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD, // Replace with your email password or an app password if you use Gmail 2-step verification
            },
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "Verification Code",
            text: `Your verification code is: ${verificationCode}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Verification code email sent successfully!");
    } catch (error) {
        console.error("Error sending verification code email:", error);
    }
};
