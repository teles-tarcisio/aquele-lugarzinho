import { Request, Response } from 'express';
// import { userServices } from '../services/index.js';
// import { NewUser } from '../repositories/userRepository.js';

export async function create(req: Request, res: Response) {
  const { userAuthData } = res?.locals?.payload;

  // check if userId exists
  // check if locationId exists
  // create new review

  return res.status(501).send(userAuthData);
}
