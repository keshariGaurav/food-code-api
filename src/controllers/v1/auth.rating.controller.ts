import { Request, Response, NextFunction } from 'express';
import Order from '../../models/order.model';
import AppError from '../..//utils/common/error/AppError';
import catchAsync from '../../utils/common/error/catchAsync';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import diner,{IDiner} from '../../models/diner.model';
import Rating from '../../models/rating.model';

export const authMiddleware = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string | undefined;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(
                new AppError(
                    'You are not logged in! Please login to get access.',
                    401
                )
            );
        }
        try {
            const decoded = await new Promise<{ id: string; iat: number }>(
                (resolve, reject) => {
                    jwt.verify(
                        token!,
                        process.env.JWT_SECRET,
                        (error, decoded) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(decoded as { id: string; iat: number });
                            }
                        }
                    );
                }
            );
            const user = await diner.findById(decoded.id);
            if (!user) {
                return next(new AppError('The user no longer exists', 401));
            }
            req.user = user;
            next();
        } catch (error) {
            return next(new AppError('Invalid token', 401));
        }
    }
);

export const verifyRating = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {orderId }= req.body;
        console.log((req.user as IDiner)._id);
        
        try{
            const order = await Order.findById(orderId);
            if (!order) {
                return next(new AppError('Order not found', 401));
            }
            if (order.dinerId.toString() !== (req.user as IDiner)._id.toString()) {
                return next(new AppError('You are not authorized to rate this order', 401));
            }
            const existingRating = await Rating.findOne({
                orderId: order._id,
                userId: order.dinerId
            });
            if (existingRating) {
                return next(new AppError('You have already rated this order', 400));
            }
            next();
        }catch (error) {
            return next(new AppError(error, 401));
        }
    });
