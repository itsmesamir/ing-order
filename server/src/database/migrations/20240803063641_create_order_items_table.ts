import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_items', table => {
    table.bigIncrements('id').primary().unsigned();
    table.bigInteger('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
    table
      .bigInteger('item_id')
      .unsigned()
      .references('id')
      .inTable('menu_items')
      .onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.decimal('discount', 5, 2).defaultTo(0.0);
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
  await knex.schema.dropTableIfExists('order_items');
}
