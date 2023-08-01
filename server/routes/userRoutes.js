import express from 'express';
import { upload } from '../middleware/multer.js'; // upload img
import signUp, { forgotPassword, logout, resendOtpNo, resendVerificationCode, resetPassword, updatePassword, updateProfile, updateUserInfo, userAuth, userLogin, verifyCode, verifyCodePhoneNo } from '../controllers/userController.js';
import { verifyLoginUser } from '../middleware/auth.js';



const router = express.Router();


router.post('/api/v1/signup', upload.single('avatar'), signUp);
router.post('/api/v1/verify', verifyCode);
router.post('/api/v1/resend-verification', resendVerificationCode);
router.post('/api/v1/isVerify', verifyLoginUser, verifyCodePhoneNo);
router.post('/api/v1/re-send-Otp', verifyLoginUser, resendOtpNo);
router.post('/api/v1/login', userLogin);
router.post("/api/v1/forgotPassword", forgotPassword)
router.post('/api/v1/password/reset/:token', resetPassword);
router.get('/api/v1/auth', verifyLoginUser, userAuth);




router.put('/api/v1/update/password', verifyLoginUser, updatePassword);
router.put('/api/v1/updateProfile', upload.single('avatar'), verifyLoginUser, updateProfile);
router.put('/api/v1/updateUserInfo', verifyLoginUser, updateUserInfo);
router.get('/api/v1/logout', verifyLoginUser, logout);



export default router;