import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as reviewsService from './reviews.service';

/**
 * Get all reviews.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchReviews = async (req: Request, res: Response) => {
  const reviews = await reviewsService.fetchReviews({});

  return res.status(HttpStatus.OK).json({ data: reviews });
};

/**
 * Get a review by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await reviewsService.fetchReviewById(Number(id), {});

  if (!review) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Review not found' });
  }

  return res.status(HttpStatus.OK).json({ data: review });
};

/**
 * Create a new review.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createReview = async (req: Request, res: Response) => {
  const review = await reviewsService.createReview(req.body);

  return res.status(HttpStatus.CREATED).json({ data: review });
};

/**
 * Update a review by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await reviewsService.updateReviewById(Number(id), req.body);

  if (!review) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Review not found' });
  }

  return res.status(HttpStatus.OK).json({ data: review });
};

/**
 * Delete a review by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await reviewsService.deleteReviewById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Review not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
