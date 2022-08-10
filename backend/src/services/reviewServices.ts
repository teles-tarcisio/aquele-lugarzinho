import { reviewRepository } from '../repositories/index.js';
import {
  userServices,
  locationServices,
} from '../services/index.js';
import { NewReviewData } from '../repositories/reviewRepository.js';
import { errorUtils } from '../utils/index.js';

async function create(newReview: NewReviewData) {
  await userServices.userIdExists(newReview.userId);

  await locationServices.locationIdExists(newReview.locationId);

  await reviewRepository.insert(newReview);
}

async function getAll() {
  const reviews = await reviewRepository.findAll();
  if (reviews.length === 0) {
    throw errorUtils.notFoundError('could not find any reviews');
  }

  return reviews;
}

const reviewServices = {
  create,
  getAll,
};

export default reviewServices;
