import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as paymentsController from './payments.controller';

const router = Router();

// Public routes
router.get('/', requireAuth, paymentsController.fetchPayments);
router.get('/:id', requireAuth, paymentsController.fetchPaymentById);

// Authenticated routes for payment operations
router.post('/', requireAuth, paymentsController.createPayment);
router.put('/:id', requireAuth, paymentsController.updatePaymentById);
router.delete('/:id', requireAuth, paymentsController.deletePaymentById);

export default router;
