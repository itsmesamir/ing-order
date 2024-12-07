import { Knex } from 'knex';

import OrderModel from '@/modules/orders/orders.model';

import BaseModel from '@/models/baseModel';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { buildPageParams } from '@/utils/pagination';

import { BadRequestError, NotFoundError } from '@/errors/errors';

import { OrderFilter } from '@/types/orders';
import { Order, OrderTypeEnum, OrderStatusEnum, OrderItemStatusEnum, Any } from '@/types/common';

import db from '@/db';
import { VALID_ORDER_STATUS_UPDATE } from '@/constants/orders';

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
  const { size, page } = params;

  const pageParams = buildPageParams(page, size);

  log.info('Fetching orders');

  const orders = await OrderModel.fetch(params, trx);

  return orders;
};

/**
 * Fetch an order by its ID.
 *
 * @param  id
 * @param  filters
 * @param  trx
 */
export const fetchOrderById = async (
  id: number,
  filters: Partial<Order>,
  trx?: Knex.Transaction
): Promise<Order | null> => {
  log.info(`Fetching order with ID ${id}`);

  const order = await OrderModel.fetchById(id, filters, trx);

  if (!order) {
    throw new NotFoundError('Order not found.');
  }

  return order;
};

// fetch order by userid

/**
 * Fetch list of orders by user ID.
 *
 * @param  userId
 * @param  trx
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
 * @param data
 */
export const createOrder = async (data: Partial<Order>): Promise<Order> => {
  log.info('Creating new order');

  const {
    user: { id: userId },
    menuItems,
    orderType = OrderTypeEnum.Normal,
    eventId,
    orderFromCafeId,
    orderToCafeId: toCafeId,
  } = data;

  const totalPrice = menuItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const orderData = {
    userId,
    cafeId: menuItems[0].cafeId,
    totalPrice: totalPrice,
    orderType,
    createdBy: userId,
  };

  const orderItemsData = menuItems.map(item => ({
    itemId: item.id,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount || 0.0,
    createdBy: userId,
  }));

  try {
    const newOrder = await BaseModel.transaction(async trx => {
      const [orderId] = await OrderModel.insert(orderData, trx);

      const orderStatusData = {
        status: OrderStatusEnum.Pending,
        createdBy: userId,
        orderId: orderId,
      };

      await OrderModel.insertOrderStatus(orderStatusData, trx);

      const orderItems = orderItemsData.map(item => ({
        ...item,
        orderId: orderId,
      }));
      await OrderModel.insertOrderItems(orderItems, trx);

      if (orderType === OrderTypeEnum.Event) {
        if (!eventId) {
          throw new BadRequestError('Event ID is required for event orders.');
        }
        const eventOrderData = {
          orderId,
          eventId,
          createdBy: userId,
        };
        await OrderModel.insertEventOrders(eventOrderData, trx);
      } else if (orderType === OrderTypeEnum.InterCafe) {
        if (!orderFromCafeId) {
          throw new BadRequestError('orderFromCafeId is required for inter-cafe orders.');
        }
        const interCafeOrderData = {
          orderId,
          fromCafeId: orderFromCafeId,
          ...(toCafeId ? { toCafeId } : {}),
          createdBy: userId,
        };
        await OrderModel.insertInterCafeOrder(interCafeOrderData, trx);
      }

      return OrderModel.fetchById(orderId, {}, trx);
    });

    return newOrder;
  } catch (error) {
    log.error('Failed to create order:', error);
    throw error;
  }
};

/**
 * Fetch list of orders by event ID.
 *
 * @param {number} eventId
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Order[]>}
 * */
export const fetchOrdersByEventId = async (
  eventId: number,
  trx?: Knex.Transaction
): Promise<Order[]> => {
  log.info(`Fetching orders for event with ID ${eventId}`);

  const orders = await OrderModel.fetchOrdersByEventId(eventId, trx);

  return orders;
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
  data: { orderStatus: OrderStatusEnum; orderItems: { id: number; status: OrderItemStatusEnum }[] },
  trx?: Knex.Transaction
) => {
  // ): Promise<Order | null> => {
  log.info(`Updating order with ID ${id}`);

  await db.transaction(async trx => {
    // Update the order status and item status
    const order = await updateOrderStatusById(Number(id), data.orderStatus);

    // If order items with specific statuses are provided, update their statuses
    // If order is not present then update the status of the order items
    if (!order && data.orderItems && data.orderItems.length > 0) {
      const menuItems = (await OrderModel.fetchOrderItemById(
        data.orderItems?.map(item => item.id),
        trx
      )) as Any[];

      const updatedOrderItems = data.orderItems.map(orderItem => {
        const matchingMenuItem = menuItems?.find(menuItem => menuItem.id === orderItem.id);
        return {
          ...orderItem,
          previousStatus: matchingMenuItem ? matchingMenuItem.status : null, // Update status if match found
        };
      });

      await OrderModel.updateOrderItemsStatusByIds(updatedOrderItems, trx); // Call the bulk update function
    }

    return {};
  });

  const updatedOrder = await OrderModel.fetchById(id, {}, trx);

  return updatedOrder;
};

export async function updateOrderStatusById(id: number, status: OrderStatusEnum) {
  log.info(`Updating status of order with id: ${id}.`);

  const { status: existingStatus } = await fetchOrderById(id, {});

  const isValidUpdate = VALID_ORDER_STATUS_UPDATE[existingStatus].includes(status);

  if (!isValidUpdate) {
    throw new BadRequestError(`Cannot update order status from ${existingStatus} to ${status}.`);
  }

  const currentUser = getFromStore('currentUser');

  await BaseModel.transaction(async trx => {
    const newStatus = {
      orderId: id,
      status,
      createdBy: currentUser.id,
    };

    await Promise.all([
      OrderModel.insertOrderStatus(newStatus, trx),
      OrderModel.updateOrderItemByOrderId(id, { status }, trx),
    ]);
  });

  const updatedOrder = await fetchOrderById(id, {});

  return updatedOrder;
}

export async function updateOrderItemStatusById(
  id: number,
  status: OrderStatusEnum,
  trx?: Knex.Transaction
) {
  log.info(`Updating status of order item with id: ${id}.`);

  const orderItem = await OrderModel.fetchOrderItemById(id);

  if (!orderItem) {
    throw new NotFoundError(`Order item with id: ${id} not found.`);
  }

  const isValidUpdate = VALID_ORDER_STATUS_UPDATE[orderItem.status].includes(status);

  if (!isValidUpdate) {
    throw new BadRequestError(`Cannot update status from ${orderItem.status} to ${status}.`);
  }

  return OrderModel.updateOrderItemById(id, { status }, trx);
}

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
