import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Order, Any } from '@/types/common';

import dbTables from '@/constants/db';

class OrderModel extends BaseModel {
  static table = dbTables.orders;

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
   * Fetch orders based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ o: this.table }).where(filters);
  }

  /**
   * Fetch an order by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Order>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ o: this.table }).where('id', id).first();
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
