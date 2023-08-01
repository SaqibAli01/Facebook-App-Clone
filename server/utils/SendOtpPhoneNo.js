// Twilio credentials
import Twilio from "twilio";
const accountSid = 'AC637f2f383ab14b5742475079ad87b5aa';
const authToken = '0c43a105058376d7da46b6fc0214324f';
const twilioPhoneNumber = '+12294045443';

// Create a Twilio client
const client = new Twilio(accountSid, authToken);


export const sendOTPNo = async (phoneNumber, otp) => {
    console.log('phoneNumber, otp', phoneNumber, otp)
    try {
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Error sending OTP.');
    }
}