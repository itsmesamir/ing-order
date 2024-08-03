import { Knex } from 'knex';

import OrderModel from '@/modules/orders/orders.model';

import logger from '@/services/logger';

import { Any, Order } from '@/types/common';

const log = logger.withNamespace('modules/orders.service');

/**
 * Fetch list of orders.
 *
 * @returns A promise that resolves to an array of orders objects.
 */
export const fetchOrders = async (params: Any, trx?: Knex.Transaction): Promise<Order[]> => {
  log.info('Fetching orders');

  const orders = await OrderModel.fetch(params, trx);

  return orders;
};

/**
 * Fetch an order by its ID.
 *
 * @param {number} id
 * @param {Any} filters
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Order | null>}
 */
export const fetchOrderById = async (
  id: number,
  filters: Any,
  trx?: Knex.Transaction
): Promise<Order | null> => {
  log.info(`Fetching order with ID ${id}`);

  const order = await OrderModel.fetchById(id, filters, trx);

  return order;
};

/**
 * Create a new order.
 *
 * @param {Partial<Order>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Order>}
 */
export const createOrder = async (data: Partial<Order>, trx?: Knex.Transaction): Promise<Order> => {
  log.info('Creating new order');

  const [id] = await OrderModel.insert(data, trx);

  const newOrder = await OrderModel.fetchById(id, {}, trx);

  return newOrder;
};

/**
 * Update an order by its ID.
 *
 * @param {number} id
 * @param {Partial<Order>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Order | null>}
 */
export const updateOrderById = async (
  id: number,
  data: Partial<Order>,
  trx?: Knex.Transaction
): Promise<Order | null> => {
  log.info(`Updating order with ID ${id}`);

  await OrderModel.updateById(id, data, trx);

  const updatedOrder = await OrderModel.fetchById(id, {}, trx);

  return updatedOrder;
};

/**
 * Delete an order by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteOrderById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting order with ID ${id}`);

  const rowsDeleted = await OrderModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
