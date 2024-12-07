import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { BadRequestError, NotFoundError } from '@/errors/errors';

import { OrderFilter } from '@/types/orders';
import {
  Order,
  OrderStatus,
  OrderItem,
  EventOrder,
  InterCafeOrder,
  OrderItemStatusEnum,
} from '@/types/common';

import db from '@/db';
import dbTables from '@/constants/db';
import { VALID_ORDER_ITEM_STATUS_UPDATE, VALID_ORDER_STATUS_UPDATE } from '@/constants/orders';

class OrderModel extends BaseModel {
  static orders = dbTables.orders;
  static orderItems = dbTables.orderItems;
  static orderStatus = dbTables.orderStatus;
  static eventOrders = dbTables.eventOrders;
  static interCafeOrders = dbTables.interCafeOrders;

  /**
   * baseQuery to fetch orders.
   *
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order[]>}
   */
  static baseQuery(trx?: Knex.Transaction) {
    const interCafeDetailsCTE = db.raw(`
    SELECT
      ico.order_id as order_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', ico.id,
          'fromCafe', JSON_OBJECT(
            'id', from_cafe.id,
            'name', from_cafe.name,
            'location', from_cafe.location,
            'imageUrl', from_cafe.image_url
          ),
          'toCafe', JSON_OBJECT(
            'id', to_cafe.id,
            'name', to_cafe.name,
            'location', to_cafe.location,
            'imageUrl', to_cafe.image_url
          )
        )
      ) as interCafeDetails
    FROM ${dbTables.interCafeOrders} as ico
    LEFT JOIN ${dbTables.cafes} as from_cafe ON ico.from_cafe_id = from_cafe.id
    LEFT JOIN ${dbTables.cafes} as to_cafe ON ico.to_cafe_id = to_cafe.id
    GROUP BY ico.order_id
  `);

    const eventDetailsCTE = db.raw(`
    SELECT
      eo.order_id as order_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', e.id,
          'name', e.name,
          'location', e.location,
          'description', e.description,
          'startDate', e.start_date,
          'endDate', e.end_date,
          'organizer', JSON_OBJECT(
            'id', o.id,
            'name', o.name,
            'description', o.description
          ),
          'managers', (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', em.manager_id,
                'name', u.name,
                'email', u.email,
                'phone', u.phone
              )
            )
            FROM ${dbTables.eventManagers} as em
            LEFT JOIN ${dbTables.users} as u ON em.manager_id = u.id
            WHERE em.event_id = e.id
          )
        )
      ) as eventDetails
    FROM ${dbTables.events} as e
    LEFT JOIN ${dbTables.eventOrganizations} as o ON e.organizer_id = o.id
    LEFT JOIN ${dbTables.eventOrders} as eo ON e.id = eo.event_id
    GROUP BY eo.order_id
  `);

    return this.queryBuilder(trx)
      .with('interCafeDetailsCTE', interCafeDetailsCTE)
      .with('eventDetailsCTE', eventDetailsCTE)
      .select(
        'o.id as id',
        'o.user_id as userId',
        'o.cafe_id as cafeId',
        'o.order_type as orderType',
        'o.total_price as totalPrice',
        'o.created_at',
        'o.updated_at',
        'us.status as status',
        'us.updated_at as statusUpdatedAt',
        'u.email',
        'u.name',
        'c.id as cafeId',
        'c.name as cafeName',
        'c.location as cafeLocation',
        'cl.id as collegeId',
        'cl.name as collegeName',
        db.raw(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', oi.id,
            'price', oi.price,
            'discount', oi.discount,
            'quantity', oi.quantity,
            'status', oi.status,
            'menu', JSON_OBJECT(
              'id', mi.id,
              'name', mi.name,
              'imageUrl', mi.image_url,
              'cafe', JSON_OBJECT(
                'id', c.id,
                'name', c.name,
                'imageUrl', c.image_url,
                'location', c.location
              )
            )
          )
        ) as items
      `),
        db.raw(`icd.interCafeDetails`),
        db.raw(`ed.eventDetails`)
      )
      .from({ o: this.orders })
      .leftJoin('users as u', 'o.user_id', 'u.id')
      .leftJoin('cafes as c', 'o.cafe_id', 'c.id')
      .leftJoin('colleges as cl', 'c.college_id', 'cl.id')
      .leftJoin('order_items as oi', 'o.id', 'oi.order_id')
      .leftJoin('menu_items as mi', 'oi.item_id', 'mi.id')
      .leftJoin(
        db
          .select('order_id', db.raw('MAX(id) as max_id'))
          .from('order_status')
          .groupBy('order_id')
          .as('latest_status'),
        'o.id',
        'latest_status.order_id'
      )
      .leftJoin('order_status as us', 'latest_status.max_id', 'us.id')
      .leftJoin('interCafeDetailsCTE as icd', 'o.id', 'icd.order_id')
      .leftJoin('eventDetailsCTE as ed', 'o.id', 'ed.order_id')
      .whereNull('o.deleted_at')
      .groupBy(
        'o.id',
        'u.id',
        'c.id',
        'cl.id',
        'us.id',
        db.raw(`icd.interCafeDetails`),
        db.raw(`ed.eventDetails`)
      )
      .orderBy('o.id', 'desc');
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: OrderFilter) {
    if (filters?.cafeIds) {
      query.whereIn('c.id', filters.cafeIds);
    }

    if (filters?.menuItemIds) {
      query.whereIn('mi.id', filters.menuItemIds);
    }

    if (filters?.userIds) {
      query.whereIn('u.id', filters.userIds);
    }

    return query;
  }

  /**
   * Fetch list of orders.
   *
   * @param filters
   * @param trx
   */
  static fetch(filters: OrderFilter, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    return query;
  }

  /**
   * Insert data into orders table.
   *
   * @param {Partial<Order>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Order>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.orders).insert(data);
  }

  /**
   * Fetch an order by its ID.
   *
   * @param orderId
   * @param filters
   * @param trx
   * @returns {Knex.QueryBuilder<Order>}
   */
  static fetchById(orderId: number, filters: Partial<Order>, trx?: Knex.Transaction) {
    return this.baseQuery(trx).where('o.id', orderId).where(filters).first();
  }

  static fetchOrderItemById(id: number, trx?: Knex.Transaction): Promise<OrderItem> {
    return this.queryBuilder(trx).select().from(this.orderItems).where({ id }).first();
  }

  /**
   * Fetch list of orders by event ID.
   *
   * @param {number} eventId
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order[]>}
   */
  static fetchOrdersByEventId(eventId: number, trx?: Knex.Transaction) {
    return this.baseQuery(trx).where('eo.event_id', eventId);
  }

  /**
   * Insert data into order_status table.
   *
   * @param {Partial<OrderStatus>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   *
   */
  static insertOrderStatus(data: Partial<OrderStatus>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.orderStatus).insert(data);
  }

  /**
   * Insert data into event_orders table.
   *
   * @param {Partial<Order>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   * */
  static insertEventOrders(data: Partial<EventOrder>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.eventOrders).insert(data);
  }

  /**
   * Insert data into inter_cafe_orders table.
   *
   * @param {Partial<Order>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   * */
  static insertInterCafeOrder(data: Partial<InterCafeOrder>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.interCafeOrders).insert(data);
  }

  /**
   * Insert data into order_items table.
   *
   * @param {Partial<OrderItem>[]} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insertOrderItems(data: Partial<OrderItem>[], trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.orderItems).insert(data);
  }

  /**
   * Fetch list of orders by user ID.
   *
   * @param {number} userId
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order[]>}
   */
  static fetchByUserId(userId: number, trx?: Knex.Transaction) {
    return this.baseQuery(trx).where('o.user_id', userId);
  }

  /**
   * Update an order by its ID.
   *
   * @param {number} id
   * @param {Partial<Order>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<Order>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.orders).where('id', id).update(data);
  }

  /**
   * Update order item by its id
   */
  static updateOrderItemById(id: number, data: Partial<OrderItem>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).update(data).table(this.orderItems).where({ id });
  }

  /**
   * Bulk update order items by their ids
   */
  static updateOrderItemsStatusByIds(
    items: { id: number; status: OrderItemStatusEnum }[], // Accept an array of objects with id and status
    trx?: Knex.Transaction
  ) {
    if (!items || items.length === 0) {
      throw new NotFoundError('No items to update.');
    }

    // Extract the IDs and statuses from the items
    const ids = items.map(item => item.id);

    // const isValidUpdate = VALID_ORDER_STATUS_UPDATE[existingStatus].includes(status);

    const isValidUpdate = items.every(item => {
      const existingStatus = item.status;
      const status = item.status; // Assuming status is what you're updating to

      return VALID_ORDER_ITEM_STATUS_UPDATE[existingStatus]?.includes(status);
    });

    if (!isValidUpdate) {
      throw new BadRequestError(`Invalid order item status transition.`);
    }

    // Construct the CASE statement for bulk update, using parameterized placeholders `?`

    const caseStatement = items
      .map(() => `WHEN id = ? THEN ?`) // Each WHEN condition uses parameterized placeholders
      .join(' ');

    // Construct the values to be passed to the query (id, status pairs)
    const values = items.flatMap(item => [item.id, item.status]);

    // Build the update query using Knex
    const query = this.queryBuilder(trx)
      .table(this.orderItems)
      .update({
        status: trx.raw(`CASE ${caseStatement} ELSE status END`, values), // Use safe parameterized values
      })
      .whereIn('id', ids); // Only update the order items with the specified ids

    return query;
  }

  /**
   * Update order item by order id
   */
  static updateOrderItemByOrderId(
    orderId: number,
    data: Partial<OrderItem>,
    trx?: Knex.Transaction
  ) {
    return this.queryBuilder(trx).update(data).table(this.orderItems).where({ orderId });
  }

  /**
   * Delete an order by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.orders).where('id', id).del();
  }
}

export default OrderModel;
