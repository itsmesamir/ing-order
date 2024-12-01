import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('inter_cafe_orders', table => {
    table.bigIncrements('id').primary().unsigned();
    table.specificType('from_cafe_id', 'bigint(19)').unsigned().references('id').inTable('cafes');
    table
      .specificType('to_cafe_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('cafes')
      .nullable();
    table.string('order_id', 255).notNullable();
    table.string('remarks', 255).nullable();
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
  await knex.schema.dropTableIfExists('inter_cafe_orders');
}
