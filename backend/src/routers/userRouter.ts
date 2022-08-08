import { Router } from 'express';
import { validateSchema } from '../middlewares/index.js';
import {
  newUserSchema,
  loginSchema,
} from '../schemas/index.js';
import { userController } from '../controllers/index.js';

const userRouter = Router();

userRouter.post(
  '/sign-up',
  validateSchema(newUserSchema),
  userController.create,
);

userRouter.post(
  '/sign-in',
  validateSchema(loginSchema),
  userController.login,
);

export default userRouter;
