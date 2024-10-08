import { router as v1CafeRouter } from '@/routes/v1/cafe.routes';
import { router as v1MenuItemRouter } from '@/routes/v1/menuItem.routes';
import { router as v1CategoryItemRouter } from '@/routes/v1/category.routes';
import { router as v1OrderRouter } from '@/routes/v1/order.routes';
import { router as v1DinerRouter } from '@/routes/v1/diner.routes';
import { router as v1CafeProfileRouter } from '@/routes/v1/cafeProfile.routes';
import { router as v1RatingRouter } from '@/routes/v1/rating.routes';

import { Router } from 'express';

const rootRouter = Router();
rootRouter.use('/v1/cafe', v1CafeRouter);
rootRouter.use('/v1/menus', v1MenuItemRouter);
rootRouter.use('/v1/category', v1CategoryItemRouter);
rootRouter.use('/v1/order', v1OrderRouter);
rootRouter.use('/v1/diner', v1DinerRouter);
rootRouter.use('/v1/account', v1CafeProfileRouter);
rootRouter.use('/v1/rating', v1RatingRouter);

export { rootRouter };
