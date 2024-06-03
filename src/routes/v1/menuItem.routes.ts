import express from 'express';
import { v1MenuItemControllers } from '../../controllers/index';
import { v1AuthCafeControllers } from '../../controllers/index';
import multer from 'multer';

const upload = multer();

const router = express.Router();
router.get(
    '/category',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.getAllByCategory
);
router.post('/available/:id', v1MenuItemControllers.updateAval);

router.get('/', v1MenuItemControllers.getAll);
router.get('/:id', v1MenuItemControllers.getOne);
router.post('/', v1AuthCafeControllers.protect, v1MenuItemControllers.create);
router.patch(
    '/:id',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.update
);
router.put(
    '/:id',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.deleteAndCreate
);
router.delete(
    '/:id',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.remove
);
export { router };
