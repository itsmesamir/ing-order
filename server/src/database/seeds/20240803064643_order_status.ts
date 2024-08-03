import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('order_status').del();

  await knex('order_status').insert([
    { id: 1, order_id: 1, status: 'Pending', created_by: 1, updated_at: new Date(), updated_by: 1 },
    {
      id: 2,
      order_id: 2,
      status: 'Preparing',
      created_by: 1,
      updated_at: new Date(),
      updated_by: 2,
    },
    { id: 3, order_id: 3, status: 'Ready', created_by: 1, updated_at: new Date(), updated_by: 3 },
    {
      id: 4,
      order_id: 4,
      status: 'Completed',
      created_by: 1,
      updated_at: new Date(),
      updated_by: 4,
    },
    {
      id: 5,
      order_id: 5,
      status: 'Cancelled',
      created_by: 1,
      updated_at: new Date(),
      updated_by: 5,
    },
    { id: 6, order_id: 6, status: 'Pending', created_by: 1, updated_at: new Date(), updated_by: 6 },
    {
      id: 7,
      order_id: 7,
      status: 'Preparing',
      created_by: 1,
      updated_at: new Date(),
      updated_by: 7,
    },
    { id: 8, order_id: 7, status: 'Ready', created_by: 1, updated_at: new Date(), updated_by: 3 },
    {
      id: 9,
      order_id: 2,
      status: 'Completed',
      created_by: 1,
      updated_at: new Date(),
      updated_by: 2,
    },
    {
      id: 10,
      order_id: 1,
      status: 'Cancelled',
      created_by: 1,
      updated_at: new Date(),
      updated_by: 1,
    },
  ]);
}
