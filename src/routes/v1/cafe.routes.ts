import express from 'express';
import { v1AuthCafeControllers } from '../../controllers/index';

const router = express.Router();
router.post('/verify-login',v1AuthCafeControllers.protect,v1AuthCafeControllers.verifyLoggedIn);
router.post('/signup', v1AuthCafeControllers.signup);
router.post('/signin', v1AuthCafeControllers.login);
router.patch(
    '/updatePassword',
    v1AuthCafeControllers.protect,
    v1AuthCafeControllers.updatePassword
);
router.post('/forgotPassword', v1AuthCafeControllers.forgotPassword);
router.patch('/resetPassword', v1AuthCafeControllers.resetPassword);
router.get('/verifyEmail/:token', v1AuthCafeControllers.verifyEmail);
router.get('/get', v1AuthCafeControllers.getAll);
export { router };
