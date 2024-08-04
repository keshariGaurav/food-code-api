import Order from '../../models/order.model';
import MenuItem from '../../models/menuItem.model';
import catchAsync from '../../utils/common/error/catchAsync';
import AppError from '../..//utils/common/error/AppError';
import { Request, Response, NextFunction } from 'express';
import { IDiner } from '../../models/diner.model';
export const getAll = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const queryObj =
            req.query.status === 'complete'
                ? { status: 'complete' }
                : { status: { $in: ['pending', 'send_to_kitchen'] } };
        const result = await Order.find(queryObj)
            .populate({
                path: 'menuItems.menuItemId',
                model: 'MenuItem',
            })
            .populate('dinerId');
        res.status(201).json({
            status: 'success',
            data: result,
        });
    }
);

export const getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await Order.findById(id);
        res.status(201).json({
            status: 'success',
            data: result,
        });
    }
);

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const dinerId =(req.user as IDiner)._id
        const items = req.body;
        console.log(items);
       let amount =0;
       let menus: { menuItemId: any; quantity: any; price: number; totalAmount: number; addOnItems: { addOnItemId: any; addOnItemName: string; selectedItems: { name: string; price: number; }[]; }[]; }[] = [];
        const menuItemsPromises = Object.keys(items).map(async key => {
            const item = items[key];
            const menu = await MenuItem.findById(item.menuId);

            if (!menu) {
                return next(new AppError('Menu not found', 404));
            }

            amount += menu.price * item.quantity;
            menu.orderCount++;
            menu.save();
            let addOns: { addOnItemId: any; addOnItemName: string; selectedItems: { name: string; price: number; }[]; }[] = [];
            if (item.selectedItems) {
                Object.keys(item.selectedItems).map(selectedItemKey => {
                    const addedItems = new Set(item.selectedItems[selectedItemKey]);
                    const selectedAddOn = menu.addOnItems.find(addOnItem => addOnItem._id.toString() === selectedItemKey.toString());
                    if (selectedAddOn) {
                        let addedAddOns: { name: string; price: number; }[] = []
                        selectedAddOn.items.forEach(it => {
                            if (addedItems.has(it._id.toString())) {
                                amount += it.price;
                                const addedAddOn = {
                                    name:it.name,
                                    price:it.price
                                }
                                addedAddOns.push(addedAddOn);
                            }
                        });
                        const addon = {
                            addOnItemId:selectedAddOn._id,
                            addOnItemName:selectedAddOn.name,
                            selectedItems: addedAddOns
                        }
                        addOns.push(addon);
                        
                    }

                });

            }
            const menuItem = {
                menuItemId : item.menuId,
                quantity : item.quantity,
                price : menu.price,
                totalAmount : item.quantity*menu.price,
                addOnItems: addOns

            }
            menus.push(menuItem);
        });


        await Promise.all(menuItemsPromises);

        console.log(amount);
        const newOrder = {
            dinerId,
            totalAmount: amount,
            menuItems: menus

        }
        console.log(newOrder);
        const result = await Order.create(newOrder);
        res.status(201).json({
            status: 'success',
            data: result,
        });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const orderId = req.params.id;
        const { status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new AppError('Item not found', 404));
        }
        const currentStatus = order.status;
        if (
            (currentStatus === 'pending' && status === 'send_to_kitchen') ||
            (currentStatus === 'send_to_kitchen' && status === 'complete')
        ) {
            order.status = status;
            await order.save();
        } else {
            return next(new AppError('Invalid status update', 404));
        }
        res.status(200).json({
            status: 'success',
            data: order,
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
