import { Request, Response } from 'express';
import { reviewServices } from '../services/index.js';

export async function create(req: Request, res: Response) {
  const { validSchema } = res?.locals?.payload;
  await reviewServices.create(validSchema);

  return res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
  const result = await reviewServices.getAll();

  return res.status(200).send(result);
}
