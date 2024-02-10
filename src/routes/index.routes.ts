import { router as v1CafeRouter } from '../routes/v1/cafe.routes';

import { Router } from 'express';

const rootRouter = Router();
rootRouter.use('/v1/cafe', v1CafeRouter);

export { rootRouter };
