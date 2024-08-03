import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('payments').del();

  await knex('payments').insert([
    {
      id: 1,
      order_id: 1,
      amount: 10.0,
      payment_method: 'CreditCard',
      created_by: 1,
      transaction_id: 'txn001',
    },
    {
      id: 2,
      order_id: 2,
      amount: 20.0,
      payment_method: 'DigitalWallet',
      created_by: 1,
      transaction_id: 'txn002',
    },
    {
      id: 3,
      order_id: 3,
      amount: 15.0,
      payment_method: 'CreditCard',
      created_by: 1,
      transaction_id: 'txn003',
    },
    {
      id: 4,
      order_id: 4,
      amount: 25.0,
      payment_method: 'DigitalWallet',
      created_by: 1,
      transaction_id: 'txn004',
    },
    {
      id: 5,
      order_id: 5,
      amount: 30.0,
      payment_method: 'CreditCard',
      created_by: 1,
      transaction_id: 'txn005',
    },
    {
      id: 6,
      order_id: 6,
      amount: 12.0,
      payment_method: 'DigitalWallet',
      created_by: 1,
      transaction_id: 'txn006',
    },
    {
      id: 7,
      order_id: 7,
      amount: 22.0,
      payment_method: 'CreditCard',
      created_by: 1,
      transaction_id: 'txn007',
    },
    {
      id: 8,
      order_id: 3,
      amount: 18.0,
      payment_method: 'DigitalWallet',
      created_by: 1,
      transaction_id: 'txn008',
    },
    {
      id: 9,
      order_id: 2,
      amount: 27.0,
      payment_method: 'CreditCard',
      created_by: 1,
      transaction_id: 'txn009',
    },
    {
      id: 10,
      order_id: 1,
      amount: 32.0,
      payment_method: 'DigitalWallet',
      created_by: 1,
      transaction_id: 'txn010',
    },
  ]);
}
