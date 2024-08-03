import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('payment_status').del(); // Clear existing data

  await knex('payment_status').insert([
    { payment_id: 1, status: 'Completed', created_by: 2, created_at: new Date() },
    { payment_id: 2, status: 'Pending', created_by: 2, created_at: new Date() },
    { payment_id: 3, status: 'Failed', created_by: 2, created_at: new Date() },
    { payment_id: 4, status: 'Completed', created_by: 2, created_at: new Date() },
    { payment_id: 5, status: 'Pending', created_by: 2, created_at: new Date() },
    { payment_id: 6, status: 'Completed', created_by: 2, created_at: new Date() },
    { payment_id: 7, status: 'Completed', created_by: 2, created_at: new Date() },
  ]);
}
