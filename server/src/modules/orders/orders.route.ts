import { Router } from 'express';

import { validateReqQuery } from '@/middlewares/validator';
import { requireAuth } from '@/middlewares/auth';

import { fetch } from './orders.validator';
import * as ordersController from './orders.controller';

const router = Router();

// Public route to get all orders
router.get('/', validateReqQuery(fetch), ordersController.fetchOrders);

// Authenticated routes for specific order operations
router.get('/:id', requireAuth, ordersController.fetchOrderById);
router.get('/user/:userId', ordersController.fetchOrdersByUserId);
router.post('/', requireAuth, ordersController.createOrder);
router.put('/status/:id', requireAuth, ordersController.updateOrderStatusById);
router.put('/item/status/:id', requireAuth, ordersController.updateOrderItemStatusById);
router.put('/:id', requireAuth, ordersController.updateOrderById);
router.delete('/:id', requireAuth, ordersController.deleteOrderById);

export default router;
