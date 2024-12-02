import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('event_managers', table => {
    table.bigIncrements('id').primary().unsigned();
    table.specificType('event_id', 'bigint(19)').unsigned().references('id').inTable('events');
    table.specificType('manager_id', 'bigint(19)').unsigned().references('id').inTable('users');
    table.unique(['event_id', 'manager_id']);
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
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('event_managers');
}
