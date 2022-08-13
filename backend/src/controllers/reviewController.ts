import { Request, Response } from 'express';
import { reviewServices } from '../services/index.js';

export async function create(req: Request, res: Response) {
  const { validSchema } = res?.locals?.payload;
  const { userAuthData } = res?.locals?.payload;
  const newReview = {
    ...validSchema,
    userId: userAuthData.id,
  };
  await reviewServices.create(newReview);

  return res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
  const result = await reviewServices.getAll();

  return res.status(200).send(result);
}
