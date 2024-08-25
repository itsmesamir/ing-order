import { Knex } from 'knex';

import OrderModel from '@/modules/orders/orders.model';

import BaseModel from '@/models/baseModel';

import logger from '@/services/logger';

import { OrderFilter } from '@/types/orders';
import { Any, Order, OrderStatusEnum } from '@/types/common';

const log = logger.withNamespace('modules/orders.service');

/**
 * Fetch list of orders.
 *
 * @returns A promise that resolves to an array of orders objects.
 */
export const fetchOrders = async (
  params: OrderFilter,
  trx?: Knex.Transaction
): Promise<Order[]> => {
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

// fetch order by userid

/**
 * Fetch list of orders by user ID.
 *
 * @param {number} userId
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Order[]>}
 */

export const fetchOrdersByUserId = async (
  userId: number,
  trx?: Knex.Transaction
): Promise<Order[]> => {
  log.info(`Fetching orders for user with ID ${userId}`);

  const orders = await OrderModel.fetchByUserId(userId, trx);

  return orders;
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

  const {
    user: { id: userId },
    menu_items,
  } = data;

  const totalPrice = menu_items.reduce((total, item) => total + item.price * item.quantity, 0);

  const orderData = {
    user_id: userId,
    cafe_id: menu_items[0].cafeId,
    total_price: totalPrice,
    created_by: userId,
  };

  const orderItemsData = menu_items.map(item => ({
    item_id: item.id,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount || 0.0,
    created_by: userId,
  }));

  try {
    const newOrder = await BaseModel.transaction(async trx => {
      const [orderId] = await OrderModel.insert(orderData, trx);

      const orderStatusData = {
        status: OrderStatusEnum.Pending,
        created_by: userId,
        order_id: orderId,
      };

      await OrderModel.insertOrderStatus(orderStatusData, trx);

      const orderItems = orderItemsData.map(item => ({
        ...item,
        order_id: orderId,
      }));
      await OrderModel.insertOrderItems(orderItems, trx);

      return OrderModel.fetchById(orderId, {}, trx);
    });

    return newOrder;
  } catch (error) {
    log.error('Failed to create order:', error);
    throw error;
  }
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
