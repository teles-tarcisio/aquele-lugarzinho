import { Request, Response } from 'express';
import { userServices } from '../services/index.js';
import { NewUser } from '../repositories/userRepository.js';

export async function create(req: Request, res: Response) {
  const newUser: NewUser = res.locals.payload.validSchema;
  console.warn(newUser, '<<< userController');

  // await userServices.create(newUser);

  return res.status(201).send('new user succesfully created');
}

export async function login(req: Request, res: Response) {
  /*
  const userData: NewUser = res.locals.payload.validSchema;

  const token: string = await userServices.login(userData);
  */

  return res.status(501).send('{ token }');
}
