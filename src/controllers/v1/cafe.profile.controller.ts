import { Request, Response, NextFunction } from 'express';

import CafeProfile from '@/models/cafeProfile.model';
import catchAsync from '@/utils/common/error/catchAsync';
import AppError from '@/utils/common/error/AppError';
import { generateQR } from '@/utils/qr/qr';

export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const cafe = await CafeProfile.findById(req.params.id);
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
        const cafe = await CafeProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
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

export const getQr = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const url = 'http://localhost:3100/';
        const table = req.body.table;
        const response = [];
        for (const i of table) {
            const qrCodeImage = await generateQR(`${url}?tableNo=${i}`);
            response.push({
                tableNo: i,
                qrCodeImage: qrCodeImage,
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                response,
            },
        });
    }
);
