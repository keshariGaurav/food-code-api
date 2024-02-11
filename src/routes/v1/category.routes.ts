import express from 'express';
import { v1CategoryControllers } from '../../controllers/index';
import { v1AuthCafeControllers } from '../../controllers/index';

const router = express.Router();

router.get('/', v1CategoryControllers.getAll);
router.get('/:id', v1CategoryControllers.getOne);
router.post('/',v1AuthCafeControllers.protect, v1CategoryControllers.create);
router.patch('/:id',v1AuthCafeControllers.protect, v1CategoryControllers.update);
router.delete('/:id', v1AuthCafeControllers.protect,v1CategoryControllers.remove);
export { router };
