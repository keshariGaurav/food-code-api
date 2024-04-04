import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import MenuItem from '../../models/menuItem.model';
import {IMenuItem} from '../../models/menuItem.model';
import catchAsync from '../../utils/common/error/catchAsync';
import sendEmail from '../..//utils/email/email';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const menuItems = await MenuItem.find({}, '-image');
        res.status(201).json({
            status: 'success',
            data: {
                menuItems:menuItems,
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
                menuItem:menuItems,
            },
        });
    }
);


export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        if(!req?.file?.buffer)
        {
            return next(new AppError('Please Upload Image!', 404));
        }
        const menuItemDetails = {
            ...req.body,
            image: req.file.buffer,
            addOnItems: JSON.parse(req.body.addOnItems)
        };
        const newItem = await MenuItem.create(menuItemDetails);
        res.status(201).json({
            status: 'success',
            data: {
                menuItem:newItem,
            },
        });
    }
);


export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const updateData = {
            ...req.body,
            ...(req.body.addOnItems && { addOnItems: JSON.parse(req.body.addOnItems) }),
        };

        if (req.file?.buffer) {
            updateData.image = req.file.buffer;
        }
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedMenuItem) {
            return next(new AppError('MenuItem not found', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                menuItem: updatedMenuItem,
            },
        });
    }
);

export const deleteAndCreate = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newItem = await MenuItem.create(req.body);
        if (newItem) {
            await MenuItem.findByIdAndDelete(req.params.id);
        }

        res.status(200).json({
            status: 'success',
            data: {
                menuItem: newItem,
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
export const updateAval = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const available = req.body.available;
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id,{
            available
        });
        if (!menuItem) {
            return next(new AppError('MenuItem not found', 404));
        }
        res.status(204).json({
            status: 'success',
            data: menuItem,
        });
    }
);

export const getAllByCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const groupedData = await MenuItem.aggregate<IMenuItem>([
            {
                $group: {
                    _id: {
                        categoryId: '$categoryId',
                    } as any,
                    menus: {
                        $push: '$$ROOT',
                    },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id.categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
        ]);

        res.status(200).json({
            status: 'success',
            data: groupedData
        });
    }
);
 
