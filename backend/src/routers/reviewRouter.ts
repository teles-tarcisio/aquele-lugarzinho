import { Router } from 'express';
import {
  ensureAuthentication,
} from '../middlewares/index.js';
import { reviewController } from '../controllers/index.js';

const reviewRouter = Router();
reviewRouter.use(ensureAuthentication);

reviewRouter.get(
  '/reviews',
  reviewController.create,
);

export default reviewRouter;
