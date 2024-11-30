import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { MenuItem, Any } from '@/types/common';
import { PageParams } from '@/types/pagination';

import dbTables from '@/constants/db';

class MenuItemModel extends BaseModel {
  static table = dbTables.menuItems;

  /**
   * Base query.
   *
   * @param {id} number
   * @param {Knex.Transaction} trx
   * @returns
   */
  static baseQuery(trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select('mi.*')
      .select({
        cafe_name: 'c.name',
        category_name: 'cat.name',
        unit_name: 'u.name',
      })
      .from({ mi: this.table })
      .leftJoin({ c: dbTables.cafes }, 'c.id', 'mi.cafe_id')
      .leftJoin({ cat: dbTables.menuCategories }, 'cat.id', 'mi.category_id')
      .leftJoin({ u: dbTables.menuUnis }, 'u.id', 'mi.unit_id');
  }

  /**
   * Inject filter in query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {FilterMenuItemsParams} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: Any) {
    if (filters?.name) {
      query.whereILike('mi.name', `%${filters.name}%`);
    }

    if (filters?.cafeName) {
      query.whereILike('c.name', `${filters.cafeName}`);
    }

    if (filters?.categoryName) {
      query.whereILike('cat.name', `${filters.categoryName}`);
    }

    if (filters?.unitName) {
      query.whereILike('u.name', `${filters.unitName}`);
    }

    return query;
  }

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
  static fetch(filters: Any, pageParams: PageParams, trx?: Knex.Transaction) {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    if (pageParams) {
      const offset = (pageParams.page - 1) * pageParams.size;

      query.limit(pageParams.size).offset(offset);
    }

    return query.then(data => data.map(this.mapToModel));
  }

  /**
   * Count total no of item.
   *
   * @param {Knex} [tx]
   * @returns {Promise<number>}
   */
  static count(trx?: Knex.Transaction): Promise<number> {
    const result = this.baseQuery(trx).count('mi.id as count').first();

    return result.then(({ count }) => count);
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
    return this.baseQuery(trx).where('mi.id', id).first().then(this.mapToModel);
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

  static mapToModel(item: Any): MenuItem {
    const data = item.id && {
      id: item.id,
      cafeId: item.cafeId,
      cafe: item.cafeId && {
        id: item.cafeId,
        name: item.cafeName,
      },
      categoryId: item.categoryId,
      category: item.categoryId && {
        id: item.categoryId,
        name: item.categoryName,
      },
      unitId: item.unitId,
      unit: item.unitId && {
        id: item.unitId,
        name: item.unitName,
      },
      name: item.name,
      description: item.description,
      price: item.price,
      maxOrder: item.maxOrder,
      preparedTime: item.preparedTime,
      availability: item.availability,
      discount: item.discount,
      isSpecial: item.isSpecial,
      status: item.status,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
      createdBy: item.createdBy,
      updatedAt: item.updatedAt,
      updatedBy: item.updatedBy,
    };

    return data as MenuItem;
  }
}

export default MenuItemModel;
