import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cafe_managers', table => {
    table.bigIncrements('id').primary().unsigned();
    table.specificType('cafe_id', 'bigint(19)').unsigned().references('id').inTable('cafes');
    table.specificType('manager_id', 'bigint(19)').unsigned().references('id').inTable('users');

    table.unique(['cafe_id', 'manager_id']);

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
      .references('id')
      .inTable('users')
      .unsigned()
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('cafe_managers');
}
