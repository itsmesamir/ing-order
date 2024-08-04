import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { Review, Any, MenuReview } from '@/types/common';

import dbTables from '@/constants/db';

class ReviewModel extends BaseModel {
  static table = dbTables.reviews;
  static menuItems = dbTables.menuItems;
  static users = dbTables.users;

  /**
   * Insert data into reviews table.
   *
   * @param {Partial<Review>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number[]>}
   */
  static insert(data: Partial<Review>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).insert(data);
  }

  static mapToModel(item: Any): MenuReview {
    const data = item.id && {
      id: item.id,
      user: {
        id: item.userId,
        imageUrl: item.imageUrl,
        name: item.name,
        email: item.email,
        phone: item.phone,
      },
      cafeId: item.cafeId,
      menuItemId: item.menuItemId,
      rating: item.rating,
      comment: item.comment,
      createdBy: item.createdBy,
      createdAt: item.createdAt,
      updatedBy: item.updatedBy,
      updatedAt: item.updatedAt,
      deletedBy: item.deletedBy,
      deletedAt: item.deletedAt,
    };

    return data;
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.menuItemId) {
      query.where('mi.id', filters?.menuItemId);
    }

    return query;
  }

  /**
   * Fetch reviews based on filters.
   *
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Review[]>}
   */
  static fetch(filters: Any, trx?: Knex.Transaction) {
    const query = this.queryBuilder(trx)
      .select('r.*')
      .select({
        imageUrl: 'u.image_url',
        name: 'u.name',
        email: 'u.email',
        phone: 'u.phone',
      })
      .from({ r: this.table })
      .leftJoin({ mi: this.menuItems }, 'mi.id', 'r.menu_item_id')
      .leftJoin({ u: this.users }, 'u.id', 'r.user_id');

    this.injectFilter(query, filters);

    return query.then(data => data.map(this.mapToModel));
  }

  /**
   * Fetch a review by its ID.
   *
   * @param {number} id
   * @param {Any} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Review>}
   */
  static fetchById(id: number, filters: Any, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).select('*').from({ r: this.table }).where('id', id).first();
  }

  /**
   * Update a review by its ID.
   *
   * @param {number} id
   * @param {Partial<Review>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static updateById(id: number, data: Partial<Review>, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).update(data);
  }

  /**
   * Delete a review by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<number>}
   */
  static deleteById(id: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx).table(this.table).where('id', id).del();
  }
}

export default ReviewModel;
