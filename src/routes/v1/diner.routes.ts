import express from 'express';
import { v1DinerControllers } from '../../controllers/index';
import { v1AuthCafeControllers } from '../../controllers/index';

const router = express.Router();

router.get('/', v1DinerControllers.getAll);
router.get('/:id', v1DinerControllers.getOne);
router.post('/',  v1DinerControllers.create);

export { router };
