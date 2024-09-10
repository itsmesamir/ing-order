import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { OrderFilter } from '@/types/orders';
import { Order, OrderStatus, OrderItem } from '@/types/common';

import db from '@/db';
import dbTables from '@/constants/db';

class OrderModel extends BaseModel {
  static orders = dbTables.orders;
  static orderItems = dbTables.orderItems;
  static orderStatus = dbTables.orderStatus;

  /**
   * baseQuery to fetch orders.
   *
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order[]>}
   */
  static baseQuery(trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select(
        'o.id as id',
        'o.user_id as userId',
        'o.cafe_id as cafeId',
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
      `)
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
      .leftJoin('order_status as us', function () {
        this.on('latest_status.max_id', '=', 'us.id');
      })
      .whereNull('o.deleted_at')
      .groupBy('o.id', 'u.id', 'c.id', 'cl.id', 'us.id')
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
