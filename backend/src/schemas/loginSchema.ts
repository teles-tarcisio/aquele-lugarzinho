/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { UserLoginData } from '../repositories/userRepository.js';

export const loginSchema = Joi.object<UserLoginData>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).required(),
});
