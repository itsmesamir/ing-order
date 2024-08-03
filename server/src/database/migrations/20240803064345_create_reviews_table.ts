import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('reviews', table => {
    table.bigIncrements('id').primary().unsigned();
    table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.bigInteger('cafe_id').unsigned().references('id').inTable('cafes').onDelete('CASCADE');
    table
      .bigInteger('menu_item_id')
      .unsigned()
      .references('id')
      .inTable('menu_items')
      .onDelete('SET NULL');
    table.integer('rating').notNullable();
    table.text('comment').nullable();
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
  await knex.schema.dropTableIfExists('reviews');
}
