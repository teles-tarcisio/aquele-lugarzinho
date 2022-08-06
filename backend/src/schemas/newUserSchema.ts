/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { NewUser } from '../repositories/userRepository.js';

export const newUserSchema = Joi.object<NewUser>({
  nickname: Joi.string().trim().min(4).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).required(),
});
