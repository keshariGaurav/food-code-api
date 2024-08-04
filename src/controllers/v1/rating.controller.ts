import Rating from '../../models/rating.model';
import catchAsync from '../../utils/common/error/catchAsync';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';
import { IDiner } from '../../models/diner.model';

export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const ratings = await Rating.find({});
        res.status(201).json({
            status: 'success',
            data: {
                ratings: ratings,
            },
        });
    }
);
export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId, rating, feedback } = req.body;
        const newRating = {
            orderId,
            userId: (req.user as IDiner)._id,
            rating,
            feedback,
        };
        const result = await Rating.create(newRating);
        res.status(201).json({
            status: 'success',
            data: result,
        });
    }
);
