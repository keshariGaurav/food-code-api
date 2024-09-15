import express from 'express';
import {
    v1AuthDinerControllers,
    v1OrderControllers,
} from '@/controllers/index';

const router = express.Router();

router.get('/', v1OrderControllers.getAll);
router.get(
    '/diner-order',
    v1AuthDinerControllers.protect,
    v1OrderControllers.getAllDinerOrder
);
router.get('/:id', v1OrderControllers.getOne);
router.post('/', v1AuthDinerControllers.protect, v1OrderControllers.create);

router.post('/verifypayment', v1OrderControllers.verifyPayment);
router.patch('/:id', v1OrderControllers.update);
router.delete('/:id', v1OrderControllers.remove);
export { router };
