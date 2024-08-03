import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('payment_status').del(); // Clear existing data

  await knex('payment_status').insert([
    { payment_id: 1, status: 'Paid', created_at: new Date() },
    { payment_id: 2, status: 'Pending', created_at: new Date() },
    { payment_id: 3, status: 'Refunded', created_at: new Date() },
    { payment_id: 4, status: 'Paid', created_at: new Date() },
    { payment_id: 5, status: 'Pending', created_at: new Date() },
    { payment_id: 6, status: 'Paid', created_at: new Date() },
    { payment_id: 7, status: 'Paid', created_at: new Date() },
  ]);
}
