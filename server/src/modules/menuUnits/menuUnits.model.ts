import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Any, MenuUnit } from '@/types/common';

import dbTables from '@/constants/db';

class MenuUnitModel extends BaseModel {
  static table = dbTables.menuUnis;

  /**
   * Insert data into menu categories table.
   *
   * @param {Partial<MenuUnit>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<MenuUnit>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch menu categories based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<MenuUnit[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ mc: this.table }).where(filters);
  }

  /**
   * Fetch a menu category by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<MenuUnit>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ mc: this.table }).where('id', id).first();
  }

  /**
   * Update a menu category by its ID.
   *
   * @param {number} id
   * @param {Partial<MenuUnit>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<MenuUnit>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a menu category by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default MenuUnitModel;
