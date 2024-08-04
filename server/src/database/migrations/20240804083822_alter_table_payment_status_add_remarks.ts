import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payment_status', table => {
    table.text('remarks').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payment_status', table => {
    table.dropColumn('remarks');
  });
}
