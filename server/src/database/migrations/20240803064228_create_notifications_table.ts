import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notifications', table => {
    table.bigIncrements('id').primary().unsigned();
    table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.bigInteger('order_id').unsigned().references('id').inTable('orders').onDelete('SET NULL');
    table.text('message').notNullable();
    table.enu('type', ['OrderStatus', 'Payment', 'General']).notNullable();
    table.enu('status', ['Unread', 'Read']).defaultTo('Unread');
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
  await knex.schema.dropTableIfExists('notifications');
}
