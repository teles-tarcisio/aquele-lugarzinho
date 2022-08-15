/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { NewReviewData } from '../repositories/reviewRepository.js';

export const newReviewSchema = Joi.object<NewReviewData>({
  reviewText: Joi.string().trim().required(),
  locationId: Joi.number().min(1).required(),
  reviewImageUrl: Joi.string().uri().required(),
});
