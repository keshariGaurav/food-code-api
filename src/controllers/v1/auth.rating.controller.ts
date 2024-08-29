import { Request, Response, NextFunction } from 'express';
import Order from '@/models/order.model';
import AppError from '@/utils/common/error/AppError';
import catchAsync from '@/utils/common/error/catchAsync';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import diner, { IDiner } from '@/models/diner.model';
import Rating from '@/models/rating.model';

export const verifyRating = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.body;

        try {
            const order = await Order.findById(orderId);
            if (!order) {
                return next(new AppError('Order not found', 401));
            }
            if (
                order.dinerId.toString() !== (req.user as IDiner)._id.toString()
            ) {
                return next(
                    new AppError(
                        'You are not authorized to rate this order',
                        401
                    )
                );
            }
            const existingRating = await Rating.findOne({
                orderId: order._id,
                userId: order.dinerId,
            });
            if (existingRating) {
                return next(
                    new AppError('You have already rated this order', 400)
                );
            }
            next();
        } catch (error) {
            return next(new AppError(error, 401));
        }
    }
);
