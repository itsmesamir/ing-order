import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_groups', table => {
    table.bigIncrements('id').primary().unsigned();
    table.string('group_name', 255).unique().notNullable();
    table.text('description').nullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
    table.integer('created_by').unsigned().nullable();
    table.integer('deleted_by').unsigned().nullable();
    table.integer('updated_by').unsigned().nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_groups');
}
