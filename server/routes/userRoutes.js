import express from 'express';
import { upload } from '../middleware/multer.js'; // upload img
import signUp, { forgotPassword, logout, resendVerificationCode, resetPassword, updatePassword, updateProfile, updateUserInfo, userAuth, userLogin, verifyCode } from '../controllers/userController.js';
import { verifyLoginUser } from '../middleware/auth.js';



const router = express.Router();


router.post('/signup', upload.single('avatar'), signUp);
router.post('/verify', verifyCode);
router.post('/resend-verification', resendVerificationCode);
router.post('/login', userLogin);
router.post("/forgotPassword", forgotPassword)
router.post('/password/reset/:token', resetPassword);
router.get('/auth', verifyLoginUser, userAuth);




router.put('/update/password', verifyLoginUser, updatePassword);
router.put('/updateProfile', upload.single('avatar'), verifyLoginUser, updateProfile);
router.put('/updateUserInfo', verifyLoginUser, updateUserInfo);
router.get('/logout', verifyLoginUser, logout);



export default router;