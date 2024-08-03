import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Any, Cafe } from '@/types/common';

import dbTables from '@/constants/db';

class CafeModel extends BaseModel {
  static table = dbTables.cafes;

  /**
   * Insert data into cafes table.
   *
   * @param {Partial<Cafe>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Cafe>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch cafes based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Country[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ c: this.table }).where(filters);
  }

  /**
   * Fetch a cafe by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Country>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ c: this.table }).where('id', id).first();
  }

  /**
   * Update a cafe by its ID.
   *
   * @param {number} id
   * @param {Partial<Cafe>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<Cafe>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a country by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default CafeModel;
