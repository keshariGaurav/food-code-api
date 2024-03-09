import express from 'express';
import { v1MenuItemControllers } from '../../controllers/index';
import { v1AuthCafeControllers } from '../../controllers/index';

const router = express.Router();

router.get('/', v1MenuItemControllers.getAll);
router.get('/:id', v1MenuItemControllers.getOne);
router.post('/', v1MenuItemControllers.create);
router.patch(
    '/:id',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.update
);
router.delete(
    '/:id',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.remove
);
export { router };
