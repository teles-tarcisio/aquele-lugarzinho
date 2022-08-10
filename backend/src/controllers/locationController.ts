import { Request, Response } from 'express';
import { locationServices } from '../services/index.js';

export async function create(req: Request, res: Response) {
  const { validSchema } = res?.locals?.payload;

  const insertedLocation = await locationServices.create(validSchema);

  return res.status(201).send(insertedLocation);
}

export async function get(req: Request, res: Response) {
  const result = await locationServices.getAll();

  return res.status(200).send(result);
}
