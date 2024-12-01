import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { OrganizationFilter } from '@/types/organizations';
import { Organization } from '@/types/common';

import db from '@/db';
import dbTables from '@/constants/db';

class OrganizationModel extends BaseModel {
  static organizations = dbTables.eventOrganizations;

  /**
   * baseQuery to fetch organizations.
   *
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Organization[]>}
   */
  static baseQuery(trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select(
        'eo.id as id',
        'eo.name as name',
        'eo.description as description',
        'eo.created_at',
        'eo.updated_at'
      )
      .from(this.organizations + ' as eo');
  }

  /**
   * Inject filters into the query.
   *
   * @param {Knex.QueryBuilder} query
   * @param {Partial<OrganizationFilter>} filters
   * @returns {Knex.QueryBuilder}
   * */
  static injectFilter(query: Knex.QueryBuilder, filters: Partial<OrganizationFilter>) {
    const { name } = filters;

    if (name) {
      query.where('eo.name', 'ilike', `%${name}%`);
    }
  }

  /**
   * Fetch organizations.
   *
   * @param {OrganizationFilter} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Organization[]>}
   */
  static async fetch(filters: OrganizationFilter, trx?: Knex.Transaction): Promise<Organization[]> {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    return query;
  }

  /**
   * Fetch an organization by its ID.
   *
   * @param {number} id
   * @param {Partial<Organization>} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Organization | null>}
   */
  static async fetchById(
    id: number,
    filters: Partial<Organization>,
    trx?: Knex.Transaction
  ): Promise<Organization | null> {
    const organization = this.baseQuery(trx).where('eo.id', id).first();

    return organization;
  }

  /**
   * Create a new organization.
   *
   * @param {Partial<Organization>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Organization>}
   */
  static async create(data: Partial<Organization>, trx?: Knex.Transaction): Promise<Organization> {
    const [organizationid] = await this.queryBuilder(trx)
      .insert(data)
      .into(this.organizations)
      .returning('id');

    return this.fetchById(organizationid, {}, trx);
  }

  /**
   * Update an organization by its ID.
   *
   * @param {number} id
   * @param {Partial<Organization>} data
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Organization>}
   */
  static async updateById(
    id: number,
    data: Partial<Organization>,
    trx?: Knex.Transaction
  ): Promise<Organization> {
    await this.queryBuilder(trx).update(data).from(this.organizations).where('id', id);

    return this.fetchById(id, {}, trx);
  }

  /**
   * Delete an organization by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<void>}
   */
  static async deleteById(id: number, trx?: Knex.Transaction): Promise<void> {
    await this.queryBuilder(trx).delete().from(this.organizations).where('id', id);

    return;
  }
}

export default OrganizationModel;
