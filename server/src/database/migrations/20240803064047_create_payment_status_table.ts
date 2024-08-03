import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payment_status', table => {
    table.bigIncrements('id').primary().unsigned();
    table
      .bigInteger('payment_id')
      .unsigned()
      .references('id')
      .inTable('payments')
      .onDelete('CASCADE');
    table.enu('status', ['Pending', 'Completed', 'Failed']).notNullable();
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
  await knex.schema.dropTableIfExists('payment_status');
}
