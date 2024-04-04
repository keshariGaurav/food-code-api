import express from 'express';
import { v1OrderControllers } from '../../controllers/index';

const router = express.Router();

router.get('/', v1OrderControllers.getAll);
router.get('/:id', v1OrderControllers.getOne);
router.post('/', v1OrderControllers.create);
router.patch('/:id', v1OrderControllers.update);
router.delete('/:id', v1OrderControllers.remove);
export { router };