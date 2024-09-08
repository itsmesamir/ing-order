import { Knex } from 'knex';

import dbTables from '../../constants/db';

const TABLE_NAME = dbTables.courses;
const USER_TABLE = dbTables.users;

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('id').unsigned().notNullable().primary();

    table.string('name').notNullable();

    table.bigint('created_by').unsigned().references('id').inTable(USER_TABLE).notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
