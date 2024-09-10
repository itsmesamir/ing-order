import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as ordersService from './orders.service';

/**
 * Get all orders.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchOrders = async (req: Request, res: Response) => {
  const orders = await ordersService.fetchOrders(req.query);

  return res.status(HttpStatus.OK).json({ data: orders });
};

/**
 * Get an order by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await ordersService.fetchOrderById(Number(id), {});

  if (!order) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Order not found' });
  }

  return res.status(HttpStatus.OK).json({ data: order });
};

/**
 * Get an order by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchOrdersByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const order = await ordersService.fetchOrdersByUserId(Number(userId));

  if (!order) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Order for user not found' });
  }

  return res.status(HttpStatus.OK).json({ data: order });
};

/**
 * Create a new order.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createOrder = async (req: Request, res: Response) => {
  const order = await ordersService.createOrder(req.body);

  return res.status(HttpStatus.CREATED).json({ data: order });
};

/**
 * Update an order by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await ordersService.updateOrderById(Number(id), req.body);

  if (!order) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Order not found' });
  }

  return res.status(HttpStatus.OK).json({ data: order });
};

/**
 * Update an order status by ID.
 */
export const updateOrderStatusById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await ordersService.updateOrderStatusById(Number(id), status);

  return res.status(HttpStatus.OK).json({ data: order });
};

/**
 * Update an order item status by ID.
 */
export const updateOrderItemStatusById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const orderItemId = await ordersService.updateOrderItemStatusById(Number(id), status);

  return res
    .status(HttpStatus.OK)
    .json({ data: orderItemId, message: 'Order item status updated' });
};

/**
 * Delete an order by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await ordersService.deleteOrderById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Order not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
