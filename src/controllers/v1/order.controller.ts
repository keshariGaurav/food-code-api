import Order from '../../models/order.model';
import catchAsync from '../../utils/common/error/catchAsync';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await Order.find({});
        res.status(201).json({
            status: 'success',
            data: result
        });
    }
);

export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await Order.findById(id);
        res.status(201).json({
            status: 'success',
            data: result
        });
    }
);

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      
        const result = await Order.create(req.body);
        res.status(201).json({
            status: 'success',
            data: result
        });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!result) {
            return next(new AppError('Item not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: result
        });
    }
);



export const remove = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await Order.findByIdAndDelete(req.params.id);
        if (!result) {
            return next(new AppError('Item not found', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
);

