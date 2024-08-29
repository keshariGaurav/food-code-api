import express from 'express';
import {
    v1AuthCafeControllers,
    v1CafeProfileControllers,
} from '@/controllers/index';

const router = express.Router();
router.get('/', v1CafeProfileControllers.getAll);
router.get('/:id', v1CafeProfileControllers.getOne);
router.post('/', v1CafeProfileControllers.create);
router.patch('/:id', v1CafeProfileControllers.update);
router.post('/get-qr', v1CafeProfileControllers.getQr);
export { router };
