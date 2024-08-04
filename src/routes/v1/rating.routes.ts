import express from 'express';
import {
    v1AuthDinerControllers,
    v1AuthRatingControllers,
    v1DinerControllers,
    v1RatingControllers,
} from '../../controllers';
const router = express.Router();

router.get('/', v1RatingControllers.getAll);
router.post(
    '/',
    v1AuthDinerControllers.protect,
    v1AuthRatingControllers.verifyRating,
    v1RatingControllers.create
);
export { router };
