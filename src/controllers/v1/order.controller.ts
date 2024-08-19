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
        try {
            const dinerId = (req.user as IDiner)._id;
            const { items, cookingRequest } = req.body;
            console.log(items);

            const menuIds = Object.values(items).map((item: any) => item.menuId);
            const menusData = await MenuItem.find({ _id: { $in: menuIds } });

            const foundMenuIds = menusData.map(menu => menu._id.toString());
            const missingMenuIds = menuIds.filter(id => !foundMenuIds.includes(id));

            if (missingMenuIds.length > 0) {
                return next(new AppError(`Menu items not found for IDs: ${missingMenuIds.join(', ')}`, 404));
            }

            let amount = 0;
            const menus = Object.values(items).map((item: any) => {
                const menu = menusData.find(menu => menu._id.toString() === item.menuId);

                amount += menu.price * item.quantity;

                const addOns = item.selectedItems
                    ? Object.entries(item.selectedItems).map(([selectedItemKey, selectedItemIds]: [string, any]) => {
                          const selectedAddOn = menu.addOnItems.find(addOnItem =>
                              addOnItem._id.toString() === selectedItemKey
                          );

                          if (selectedAddOn) {
                              const addedAddOns = selectedAddOn.items
                                  .filter(it => selectedItemIds.includes(it._id.toString()))
                                  .map(it => {
                                      amount += it.price;
                                      return { name: it.name, price: it.price };
                                  });

                              return {
                                  addOnItemId: selectedAddOn._id,
                                  addOnItemName: selectedAddOn.name,
                                  selectedItems: addedAddOns,
                              };
                          }
                          return null;
                      }).filter(addOn => addOn !== null)
                    : [];

                return {
                    menuItemId: item.menuId,
                    quantity: item.quantity,
                    price: menu.price,
                    totalAmount: item.quantity * menu.price,
                    addOnItems: addOns,
                };
            });
            await MenuItem.updateMany(
                { _id: { $in: menuIds } },
                { $inc: { orderCount: 1 } }
            );

            const newOrder = {
                dinerId,
                totalAmount: amount,
                menuItems: menus,
                cookingRequest,
            };
            console.log(newOrder);

            const result = await Order.create(newOrder);
            res.status(201).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            next(error);
        }
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
