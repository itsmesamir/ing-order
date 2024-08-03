import { Knex } from 'knex';

import PaymentModel from '@/modules/payments/payments.model';

import logger from '@/services/logger';

import { Any, Payment } from '@/types/common';

const log = logger.withNamespace('modules/payments.service');

/**
 * Fetch list of payments.
 *
 * @returns A promise that resolves to an array of payment objects.
 */
export const fetchPayments = async (params: Any, trx?: Knex.Transaction): Promise<Payment[]> => {
  log.info('Fetching payments');

  const payments = await PaymentModel.fetch(params, trx);

  return payments;
};

/**
 * Fetch a payment by its ID.
 *
 * @param {number} id
 * @param {Any} filters
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Payment | null>}
 */
export const fetchPaymentById = async (
  id: number,
  filters: Any,
  trx?: Knex.Transaction
): Promise<Payment | null> => {
  log.info(`Fetching payment with ID ${id}`);

  const payment = await PaymentModel.fetchById(id, filters, trx);

  return payment;
};

/**
 * Create a new payment.
 *
 * @param {Partial<Payment>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Payment>}
 */
export const createPayment = async (
  data: Partial<Payment>,
  trx?: Knex.Transaction
): Promise<Payment> => {
  log.info('Creating new payment');

  const [id] = await PaymentModel.insert(data, trx);

  const newPayment = await PaymentModel.fetchById(id, {}, trx);

  return newPayment;
};

/**
 * Update a payment by its ID.
 *
 * @param {number} id
 * @param {Partial<Payment>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Payment | null>}
 */
export const updatePaymentById = async (
  id: number,
  data: Partial<Payment>,
  trx?: Knex.Transaction
): Promise<Payment | null> => {
  log.info(`Updating payment with ID ${id}`);

  await PaymentModel.updateById(id, data, trx);

  const updatedPayment = await PaymentModel.fetchById(id, {}, trx);

  return updatedPayment;
};

/**
 * Delete a payment by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deletePaymentById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting payment with ID ${id}`);

  const rowsDeleted = await PaymentModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
