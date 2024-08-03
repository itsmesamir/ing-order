import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { MenuItem, Any } from '@/types/common';

import dbTables from '@/constants/db';

class MenuItemModel extends BaseModel {
  static table = dbTables.menuItems;

  /**
   * Insert data into menu items table.
   *
   * @param {Partial<MenuItem>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<MenuItem>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch menu items based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<MenuItem[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ mi: this.table }).where(filters);
  }

  /**
   * Fetch a menu item by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<MenuItem>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ mi: this.table }).where('id', id).first();
  }

  /**
   * Update a menu item by its ID.
   *
   * @param {number} id
   * @param {Partial<MenuItem>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<MenuItem>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a menu item by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default MenuItemModel;
