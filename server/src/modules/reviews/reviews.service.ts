import { Knex } from 'knex';

import ReviewModel from '@/modules/reviews/reviews.model';

import logger from '@/services/logger';

import { Any, MenuReview, Review } from '@/types/common';

const log = logger.withNamespace('modules/reviews.service');

/**
 * Fetch list of reviews.
 *
 * @returns A promise that resolves to an array of review objects.
 */
export const fetchReviews = async (params: Any, trx?: Knex.Transaction): Promise<MenuReview[]> => {
  log.info('Fetching reviews');

  const reviews = await ReviewModel.fetch(params, trx);

  return reviews;
};

/**
 * Fetch a review by its ID.
 *
 * @param {number} id
 * @param {Any} filters
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Review | null>}
 */
export const fetchReviewById = async (
  id: number,
  filters: Any,
  trx?: Knex.Transaction
): Promise<Review | null> => {
  log.info(`Fetching review with ID ${id}`);

  const review = await ReviewModel.fetchById(id, filters, trx);

  return review;
};

/**
 * Create a new review.
 *
 * @param {Partial<Review>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Review>}
 */
export const createReview = async (
  data: Partial<Review>,
  trx?: Knex.Transaction
): Promise<Review> => {
  log.info('Creating new review');

  const [id] = await ReviewModel.insert(data, trx);

  const newReview = await ReviewModel.fetchById(id, {}, trx);

  return newReview;
};

/**
 * Update a review by its ID.
 *
 * @param {number} id
 * @param {Partial<Review>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Review | null>}
 */
export const updateReviewById = async (
  id: number,
  data: Partial<Review>,
  trx?: Knex.Transaction
): Promise<Review | null> => {
  log.info(`Updating review with ID ${id}`);

  await ReviewModel.updateById(id, data, trx);

  const updatedReview = await ReviewModel.fetchById(id, {}, trx);

  return updatedReview;
};

/**
 * Delete a review by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteReviewById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting review with ID ${id}`);

  const rowsDeleted = await ReviewModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
