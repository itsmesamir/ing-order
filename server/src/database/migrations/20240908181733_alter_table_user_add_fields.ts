import { Knex } from 'knex';

import dbTables from '../../constants/db';

const TABLE_NAME = dbTables.users;
const DEPARTMENT_TABLE = dbTables.departments;
const COURSE_TABLE = dbTables.courses;

const TYPE_ENUM = ['Student', 'Teacher', 'Staff'];
const GENDER_ENUM = ['Male', 'Female', 'Other'];

/**
 * Alter table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, table => {
    table.dropColumn('department');

    table.bigInteger('reg_id').unsigned().notNullable();

    table.string('alternative_phone', 20).nullable();

    table.string('personal_email', 100).notNullable();

    table.enum('gender', GENDER_ENUM).notNullable();

    table.string('batch').nullable();

    table.string('class').nullable();

    table.string('section').nullable();

    table
      .bigInteger('department_id')
      .unsigned()
      .references('id')
      .inTable(DEPARTMENT_TABLE)
      .nullable();

    table.bigInteger('course_id').unsigned().references('id').inTable(COURSE_TABLE).nullable();

    table.enum('type', TYPE_ENUM);

    table.string('temporary_address');

    table.string('permanent_address');
  });
}

/**
 * Drop table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
