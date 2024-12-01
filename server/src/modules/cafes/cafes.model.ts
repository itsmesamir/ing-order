import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Any, Cafe } from '@/types/common';

import dbTables from '@/constants/db';
import db from '@/db';

class CafeModel extends BaseModel {
  static table = dbTables.cafes;

  /**
   * Insert data into cafes table.
   *
   * @param {Partial<Cafe>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static async insert(data: Partial<Cafe>, trx?: Knex.Transaction): Promise<Cafe> {
    const [cafeId] = await this.queryBuilder(trx).table(this.table).insert(data);

    return this.fetchById(cafeId, {}, trx);
  }

  /**
   * Insert data into cafe_managers table.
   *
   * @param {Partial<Cafe>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static async insertCafeManager(cafeId: number, managerIds: number[], trx?: Knex.Transaction) {
    const cafeManagers = managerIds.map(userId => ({ cafe_id: cafeId, manager_id: userId }));

    return this.queryBuilder(trx).table(dbTables.cafeManagers).insert(cafeManagers);
  }

  /**
   * Delete a cafe manager.
   *
   * @param {number} cafeId
   * @param {number} managerId
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static async deleteCafeManager(cafeId: number, managerIds: number[], trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .table(dbTables.cafeManagers)
      .where('cafe_id', cafeId)
      .whereIn('manager_id', managerIds)
      .del();
  }

  /**
   * baseQuery to fetch cafes.
   *
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Event[]>}
   */
  static baseQuery(trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select(
        'c.*',
        db.raw(`
        JSON_ARRAYAGG(
          CASE 
            WHEN cm.manager_id IS NOT NULL THEN
              JSON_OBJECT(
                'id', cm.manager_id,
                'name', u.name,
                'email', u.email,
                'phone', u.phone
              )
          END
        ) as managers
      `)
      )
      .from({ c: this.table })
      .leftJoin({ cm: dbTables.cafeManagers }, 'c.id', 'cm.cafe_id')
      .leftJoin({ u: dbTables.users }, 'u.id', 'cm.manager_id')
      .groupBy('c.id');
  }

  /**
   * Fetch cafes based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Cafe[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    // return this.queryBuilder(trx).select('*').from({ c: this.table }).where(filters);
    return this.baseQuery(trx).where(filters);
  }

  /**
   * Fetch a cafe by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Cafe>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.baseQuery(trx).where('c.id', id).first();
  }

  /**
   * Fetch cafe managers.
   *
   * @param {number} cafeId
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<User[]>}
   * @memberof CafeModel
   * @static
   * @throws {Error}
   */
  static fetchCafeManagers(cafeId: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select('u.*')
      .from({ cm: dbTables.cafeManagers })
      .join({ u: dbTables.users }, 'u.id', 'cm.manager_id')
      .where('cm.cafe_id', cafeId);
  }

  /**
   * Update a cafe by its ID.
   *
   * @param {number} id
   * @param {Partial<Cafe>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static update(id: number, data: Partial<Cafe>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a cafe by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static delete(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }

  /**
   * Delete cafe managers.
   *
   * @param {number} cafeId
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteCafeManagersByCafeId(cafeId: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(dbTables.cafeManagers).where('cafe_id', cafeId).del();
  }
}

export default CafeModel;
