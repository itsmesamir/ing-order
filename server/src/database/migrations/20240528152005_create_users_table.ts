import { Knex } from 'knex';

import dbTables from '../../constants/db';

const DEPARTMENT_TABLE = dbTables.departments;
const COURSE_TABLE = dbTables.courses;

const TYPE_ENUM = [
  'Student',
  'Teacher',
  'Staff',
  'Manager',
  'Admin',
  'Organizer',
  'Developer',
  'Super Admin',
];
const GENDER_ENUM = ['Male', 'Female', 'Other'];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').primary().unsigned();

    table.string('name', 100).notNullable();

    table.string('email', 100).notNullable();

    table.string('phone', 20).notNullable();

    table.string('reg_id').nullable();

    table
      .specificType('designation_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('designations');

    table
      .specificType('manager_id', 'bigint(19)')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users');

    table.string('password', 100).notNullable();
    table.boolean('is_active').defaultTo(true);

    table.string('alternative_phone', 20).nullable();

    table.string('personal_email', 100).nullable();

    table.enum('gender', GENDER_ENUM).nullable();

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

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table
      .specificType('created_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('updated_at');

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('deleted_at').nullable();

    table
      .specificType('deleted_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .unsigned()
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Users');
}
