import Category from '@/models/category.model';
import catchAsync from '@/utils/common/error/catchAsync';
import AppError from '@/utils/common/error/AppError';

import { Request, Response, NextFunction } from 'express';

export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const categories = await Category.find({});
        res.status(201).json({
            status: 'success',
            data: {
                categories,
            },
        });
    }
);

export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return next(new AppError('Category not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                category,
            },
        });
    }
);

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newCategory = await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                category: newCategory,
            },
        });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return next(new AppError('Category not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                category: updatedCategory,
            },
        });
    }
);

export const remove = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return next(new AppError('Category not found', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
);
