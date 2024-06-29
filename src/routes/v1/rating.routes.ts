import express from 'express';
import { v1AuthRatingControllers , v1RatingControllers } from '../../controllers';
const router = express.Router();

router.get('/' , v1RatingControllers.getAll);
router.post('/' , v1AuthRatingControllers.authMiddleware, v1AuthRatingControllers.verifyRating, v1RatingControllers.create);
export { router };
