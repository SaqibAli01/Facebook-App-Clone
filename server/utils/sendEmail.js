import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

const sendEmail = async (options) => {
    // const verifyUrl = `http://localhost:8000/users/password/reset?`
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });


    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: `<a href="${verifyUrl}">Varify email</a>`,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;

