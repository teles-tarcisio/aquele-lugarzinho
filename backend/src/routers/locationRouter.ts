import { Router } from 'express';
import {
  ensureAuthentication,
  validateSchema,
} from '../middlewares/index.js';
import { newLocationSchema } from '../schemas/newLocationSchema.js';
import { locationController } from '../controllers/index.js';

const locationRouter = Router();
locationRouter.use(ensureAuthentication);

locationRouter.post(
  '/locations/new',
  validateSchema(newLocationSchema),
  locationController.create,
);

locationRouter.get(
  '/locations',
  locationController.get,
);

export default locationRouter;
