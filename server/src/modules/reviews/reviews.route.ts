import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as reviewsController from './reviews.controller';

const router = Router();

// Public routes
router.get('/', reviewsController.fetchReviews);
router.get('/:id', reviewsController.fetchReviewById);

// Authenticated routes for review operations
router.post('/', requireAuth, reviewsController.createReview);
router.put('/:id', requireAuth, reviewsController.updateReviewById);
router.delete('/:id', requireAuth, reviewsController.deleteReviewById);

export default router;
