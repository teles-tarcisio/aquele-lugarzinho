import { Router } from 'express';
import userRouter from './userRouter.js';
import reviewRouter from './reviewRouter.js';
import locationRouter from './locationRouter.js';

const mainRouter = Router();
mainRouter.use(userRouter);
mainRouter.use(reviewRouter);
mainRouter.use(locationRouter);

export default mainRouter;
