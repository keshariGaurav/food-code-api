import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import MenuItem from '../../models/menuItem.model';
import catchAsync from '../../utils/common/error/catchAsync';
import sendEmail from '../..//utils/email/email';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const menuItems = await MenuItem.find({});
        res.status(201).json({
            status: 'success',
            data: {
                menuItems,
            },
        });
    }
);

export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const menuItems = await MenuItem.findById(id);
        res.status(201).json({
            status: 'success',
            data: {
                menuItems,
            },
        });
    }
);

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const menuItemDetails = req.body;
        const newItem = await MenuItem.create(menuItemDetails);
        res.status(201).json({
            status: 'success',
            data: {
                newItem,
            },
        });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMenuItem) {
            return next(new AppError('MenuItem not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                category: updatedMenuItem,
            },
        });
    }
);

export const remove = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return next(new AppError('MenuItem not found', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
);
