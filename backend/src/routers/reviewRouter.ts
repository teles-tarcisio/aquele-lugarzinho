import { Router } from 'express';
import {
  ensureAuthentication,
  validateSchema,
} from '../middlewares/index.js';
import { newReviewSchema } from '../schemas/index.js';
import { reviewController } from '../controllers/index.js';

const reviewRouter = Router();
reviewRouter.use(ensureAuthentication);

reviewRouter.post(
  '/reviews/new',
  validateSchema(newReviewSchema),
  reviewController.create,
);

reviewRouter.get(
  '/reviews',
  reviewController.get,
);

export default reviewRouter;
