import CafeProfile from '../../models/cafeProfile.model';
import catchAsync from '../../utils/common/error/catchAsync';
import AppError from '../../utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';



export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const cafe = await CafeProfile.findById(req.params.id);
        if (!cafe) {
            return next(new AppError('CafeProfile not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                cafe
            },
        });
    }
);

export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const cafe = await CafeProfile.findOne({});
        if (!cafe) {
            return next(new AppError('CafeProfile not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                cafe,
            },
        });
    }
);

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const cafe = await CafeProfile.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                cafe,
            },
        });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const cafe = await CafeProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        console.log(cafe);
        if (!cafe) {
            return next(new AppError('CafeProfile not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                cafe
            },
        });
    }
);


