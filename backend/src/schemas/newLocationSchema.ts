/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { NewLocationData } from '../repositories/locationRepository.js';

export const newLocationSchema = Joi.object<NewLocationData>({
  name: Joi.string().trim().min(8).required(),
  address: Joi.string().trim().required(),
});
