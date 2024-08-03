import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Payment, Any } from '@/types/common';

import dbTables from '@/constants/db';

class PaymentModel extends BaseModel {
  static table = dbTables.payments;

  /**
   * Insert data into payments table.
   *
   * @param {Partial<Payment>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Payment>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch payments based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Payment[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ p: this.table }).where(filters);
  }

  /**
   * Fetch a payment by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Payment>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ p: this.table }).where('id', id).first();
  }

  /**
   * Update a payment by its ID.
   *
   * @param {number} id
   * @param {Partial<Payment>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<Payment>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a payment by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default PaymentModel;
