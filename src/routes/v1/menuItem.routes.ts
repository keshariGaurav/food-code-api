import express from 'express';
import { v1MenuItemControllers } from '../../controllers/index';
import { v1AuthCafeControllers } from '../../controllers/index';
import multer from 'multer';

const upload = multer();

const router = express.Router();
router.get('/category', v1MenuItemControllers.getAllByCategory);
router.post('/available/:id', v1MenuItemControllers.updateAval);

router.get('/', v1MenuItemControllers.getAll);
router.get('/:id', v1MenuItemControllers.getOne);
router.post('/', upload.single('image') , v1MenuItemControllers.create);
router.patch(
    '/:id',
    upload.none(),
    v1MenuItemControllers.update
);
router.put('/:id',v1MenuItemControllers.deleteAndCreate);
router.delete(
    '/:id',
    v1MenuItemControllers.remove
);
export { router };
