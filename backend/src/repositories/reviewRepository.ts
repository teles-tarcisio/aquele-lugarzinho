import { Review } from '@prisma/client';
import prisma from '../database/dbConfig.js';

export type NewReviewData = Omit<Review, 'id' | 'userId'>;
export type CreateReviewData = Omit<Review, 'id'>;

async function insert(newReview: CreateReviewData) {
  await prisma.review.create({
    data: newReview,
  });
}

async function findAll() {
  const allReviews = await prisma.review.findMany({
    include: {
      user: true,
    },
  });

  return allReviews;
}

const reviewRepository = {
  insert,
  findAll,
};

export default reviewRepository;
