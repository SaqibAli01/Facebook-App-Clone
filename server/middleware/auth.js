import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
// import User from "../model/userSchema.js";
// import dotenv from 'dotenv';
// dotenv.config({ path: './config/config.env' });


export const verifyLoginUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        // console.log('token', token)

        if (!token) {
            return res.status(401).send("Please Login to Access this Resource");
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);


        // const user = await User.findById(decodedData._id);
        const user = await User.findOne({ email: decodedData.email });
        // console.log("user: ", user)
        if (!user) {
            return res.status(401).send("User not found");
        }

        req.user = user;
        // console.log("req.user.........", req.user);
        next();
    } catch (error) {
        return res.status(401).send("Authentication Failed");
    }
};



















// export const verifyLoginUser = async (req, res, next) => {

//     try {
//         const token = req.headers.token;
//         if (!token) {
//             return res.status(401).send("Please Login to Access this Resource");
//         }
//         const deCodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.user = await User.findById(deCodedData.user);
//         console.log("req.user.........", req.user)
//         console.log('deCodedData Email', deCodedData.email)
//         next();
//     } catch (error) {
//         return res.status(401).send("Authentication Failed");
//     }
// };



