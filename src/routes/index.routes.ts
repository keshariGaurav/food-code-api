import { router as v1CafeRouter } from '../routes/v1/cafe.routes';
import { router as v1MenuItemRouter } from '../routes/v1/menuItem.routes';
import { router as v1CategoryItemRouter } from '../routes/v1/category.routes';
import { Router } from 'express';

const rootRouter = Router();
rootRouter.use('/v1/cafe', v1CafeRouter);
rootRouter.use('/v1/menus', v1MenuItemRouter);
rootRouter.use('/v1/category', v1CategoryItemRouter);

export { rootRouter };
