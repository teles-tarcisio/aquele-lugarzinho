/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { NewReviewData } from '../repositories/reviewRepository.js';

export const newReviewSchema = Joi.object<NewReviewData>({
  userId: Joi.number().min(1).required(),
  reviewText: Joi.string().trim().required(),
  locationId: Joi.number().min(1).required(),
});
