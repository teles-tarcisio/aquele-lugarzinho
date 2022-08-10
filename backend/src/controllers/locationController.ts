import { Request, Response } from 'express';
import { locationServices } from '../services/index.js';

export async function create(req: Request, res: Response) {
  const { validSchema } = res?.locals?.payload;

  const insertedLocation = await locationServices.create(validSchema);

  return res.status(201).send(insertedLocation);
}
