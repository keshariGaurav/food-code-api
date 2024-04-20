import Order from '../../models/order.model';
import catchAsync from '../../utils/common/error/catchAsync';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const queryObj = req.query.status === 'complete' ? { status: 'complete' } : { status: { $in: ['pending', 'send_to_kitchen']}};
        const result = await Order.find(queryObj).populate({
            path:'menuItems.menuItemId',
            model:'MenuItem'
        }).populate('dinerId');
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
        const  orderId  = req.params.id;
        console.log(orderId);
        const { status } = req.body;
        console.log(status);
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new AppError('Item not found', 404));
        }
        const currentStatus = order.status;
        if ((currentStatus === 'pending' && status === 'send_to_kitchen') ||
        (currentStatus === 'send_to_kitchen' && status === 'complete')) {
        order.status = status; 
        await order.save(); 
    } 
    else{
        return next(new AppError('Invalid status update', 404));
    }
        res.status(200).json({
            status: 'success',
            data: order
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

