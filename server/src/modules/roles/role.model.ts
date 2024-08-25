import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Any } from '@/types/common';

import dbTables from '@/constants/db';

class RoleModel extends BaseModel {
  static table = dbTables.roles;

  /**
   * Insert data into role table.
   *
   * @param {Partial<Any>} data
   * @param {Knex.Transaction} trx
   * @returns  {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Any>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterNotesParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.roleId) {
      query.where('r.id', filters.roleId);
    }

    if (filters?.roleIds) {
      query.whereIn('r.id', filters.roleIds);
    }

    return query;
  }

  static fetch(filters?: Any, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).select('*').from({ r: this.table });

    this.injectFilter(query, filters);

    return query;
  }

  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ d: this.table }).where('id', id).first();
  }

  static update(id: number, data: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  static delete(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }

  static count(filters: Any, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx).count('* as count').from({ r: this.table });

    this.injectFilter(query, filters);

    return query;
  }
}

export default RoleModel;
