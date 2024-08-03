import express from 'express';
import { v1MenuItemControllers } from '../../controllers/index';
import { v1AuthCafeControllers } from '../../controllers/index';
import cacheMiddleware from '../../middleware/cacheMiddleware';
import multer from 'multer';

const upload = multer();

const router = express.Router();
router.get(
    '/category',
    cacheMiddleware(['menu-items']),
    v1MenuItemControllers.getAllByCategory
);
router.get(
    '/top-ordered-items',
    v1AuthCafeControllers.protect,
    v1MenuItemControllers.getTopMenuItem
);

router.post('/available/:id', v1MenuItemControllers.updateAval);

router.get('/', v1MenuItemControllers.getAll);
router.get('/:id', v1MenuItemControllers.getOne);
router.post('/', v1MenuItemControllers.create);
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
