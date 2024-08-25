import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('menu_items', table => {
    table.bigIncrements('id').primary().unsigned();
    table.bigInteger('cafe_id').unsigned().references('id').inTable('cafes').onDelete('CASCADE');
    table
      .bigInteger('category_id')
      .unsigned()
      .references('id')
      .inTable('menu_categories')
      .onDelete('CASCADE');
    table
      .bigInteger('unit_id')
      .unsigned()
      .references('id')
      .inTable('menu_units')
      .onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.text('description').nullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('max_order').defaultTo(0);
    table.integer('prepared_time').defaultTo(0);
    table.boolean('availability').defaultTo(true);
    table.decimal('discount', 5, 2).defaultTo(0.0);
    table.boolean('is_special').defaultTo(false);
    table.enu('status', ['Available', 'NotAvailable', 'ComingSoon']).defaultTo('Available');
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
  await knex.schema.dropTableIfExists('menu_items');
}
