import express from 'express';
import passport from 'passport';
import { v1DinerControllers } from '../../controllers/index';
import { v1AuthDinerControllers } from '../../controllers/index';

const router = express.Router();

router.get('/', v1DinerControllers.getAll);
router.get('/:id', v1DinerControllers.getOne);
router.post('/', v1DinerControllers.create);
router.post('/guest-login', v1AuthDinerControllers.createGuest);

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    v1AuthDinerControllers.authCallback
);
router.post('/login', v1AuthDinerControllers.sendLoginOtp);
router.post('/verify-login', v1AuthDinerControllers.login);
export { router };
