import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

import diner from '@/models/diner.model';
import { IDiner } from '@/models/diner.model';
import catchAsync from '@/utils/common/error/catchAsync';
import AppError from '@/utils/common/error/AppError';
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const diners = await diner.find({});
        res.status(201).json({
            status: 'success',
            data: {
                diners: diners,
            },
        });
    }
);

export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const diners = await diner.findById(id);
        res.status(201).json({
            status: 'success',
            data: {
                diners: diners,
            },
        });
    }
);

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newItem = await diner.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                diner: newItem,
            },
        });
    }
);
