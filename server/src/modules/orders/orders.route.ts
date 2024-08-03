import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as ordersController from './orders.controller';

const router = Router();

// Public route to get all orders
router.get('/', requireAuth, ordersController.fetchOrders);

// Authenticated routes for specific order operations
router.get('/:id', requireAuth, ordersController.fetchOrderById);
router.get('/user/:userId', ordersController.fetchOrdersByUserId);
router.post('/', requireAuth, ordersController.createOrder);
router.put('/:id', requireAuth, ordersController.updateOrderById);
router.delete('/:id', requireAuth, ordersController.deleteOrderById);

export default router;
