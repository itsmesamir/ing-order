import { Knex } from 'knex';

import dbTables from '../../constants/db';

const TABLE_NAME = dbTables.departments;
const USER_TABLE = dbTables.users;

/**
 * Create table departments.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('id').unsigned().notNullable().primary();

    table.string('name').notNullable();

    table.bigint('created_by').unsigned();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop table departments.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
