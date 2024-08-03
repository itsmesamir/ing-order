import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('order_items').del();

  // Insert seed entries
  await knex('order_items').insert([
    {
      order_id: 1,
      item_id: 1,
      quantity: 2,
      price: 12.0,
      discount: 1.0,
      created_by: 1,
    },
    {
      order_id: 1,
      item_id: 2,
      quantity: 1,
      price: 8.5,
      discount: 0.0,
      created_by: 1,
    },
    {
      order_id: 2,
      item_id: 3,
      quantity: 3,
      price: 5.75,
      discount: 0.5,
      created_by: 2,
    },
    {
      order_id: 3,
      item_id: 1,
      quantity: 4,
      price: 12.0,
      discount: 2.0,
      created_by: 3,
    },
    {
      order_id: 3,
      item_id: 4,
      quantity: 2,
      price: 7.25,
      discount: 0.0,
      created_by: 3,
    },
  ]);
}
