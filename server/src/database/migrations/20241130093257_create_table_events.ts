import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('events', table => {
    table.bigIncrements('id').primary().unsigned();
    table.string('name', 255).notNullable();
    table.string('location', 255).nullable();
    table.string('description', 255).nullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table
      .specificType('organizer_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('event_organizations')
      .notNullable();
    table
      .specificType('created_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('updated_at');

    table
      .specificType('deleted_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('events');
}
