import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Order, Any, OrderStatus, OrderItem } from '@/types/common';

import db from '@/db';
import dbTables from '@/constants/db';

class OrderModel extends BaseModel {
  static table = dbTables.orders;

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
            'price', oi.price,
            'discount', oi.discount,
            'quantity', oi.quantity,
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
      .from({ o: 'Orders' })
      .leftJoin('Users as u', 'o.user_id', 'u.id')
      .leftJoin('Cafes as c', 'o.cafe_id', 'c.id')
      .leftJoin('Colleges as cl', 'c.college_id', 'cl.id')
      .leftJoin('OrderItems as oi', 'o.id', 'oi.order_id')
      .leftJoin('MenuItems as mi', 'oi.item_id', 'mi.id')
      .leftJoin(
        db
          .select('order_id', db.raw('MAX(id) as max_id'))
          .from('OrderStatus')
          .groupBy('order_id')
          .as('latest_status'),
        'o.id',
        'latest_status.order_id'
      )
      .leftJoin('OrderStatus as us', function () {
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
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.status) {
      query.where('us.status', filters.status);
    }

    return query;
  }

  /**
   * Fetch list of orders.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
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
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch an order by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order>}
   */
  static fetchById(orderId: number, filters: Any, trx?: Knex.Transaction) {
    return this.baseQuery(trx).where('o.id', orderId).first();
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
    return this.queryBuilder(trx).table('OrderStatus').insert(data);
  }

  /**
   * Insert data into order_items table.
   *
   * @param {Partial<OrderItem>[]} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insertOrderItems(data: Partial<OrderItem>[], trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table('OrderItems').insert(data);
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
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete an order by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default OrderModel;
