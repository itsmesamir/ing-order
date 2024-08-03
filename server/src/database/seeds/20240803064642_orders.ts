import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('orders').del(); // Clear existing data

  await knex('orders').insert([
    {
      user_id: 1,
      cafe_id: 1,
      total_price: 5.0,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
    {
      user_id: 2,
      cafe_id: 2,
      total_price: 7.5,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
    {
      user_id: 3,
      cafe_id: 3,
      total_price: 4.75,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
    {
      user_id: 4,
      cafe_id: 4,
      total_price: 6.25,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
    {
      user_id: 5,
      cafe_id: 5,
      total_price: 8.0,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
    {
      user_id: 6,
      cafe_id: 6,
      total_price: 3.5,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
    {
      user_id: 7,
      cafe_id: 7,
      total_price: 9.0,
      created_by: 1,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    },
  ]);
}
