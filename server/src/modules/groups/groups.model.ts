import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Group, Any } from '@/types/common';

import dbTables from '@/constants/db';

class GroupModel extends BaseModel {
  static table = dbTables.groups;

  /**
   * Insert data into groups table.
   *
   * @param {Partial<Group>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Group>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Fetch groups based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Group[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ g: this.table }).where(filters);
  }

  /**
   * Fetch a group by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Group>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ g: this.table }).where('id', id).first();
  }

  /**
   * Update a group by its ID.
   *
   * @param {number} id
   * @param {Partial<Group>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<Group>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a group by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default GroupModel;
