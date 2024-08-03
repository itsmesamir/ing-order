import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as paymentsService from './payments.service';

/**
 * Get all payments.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchPayments = async (req: Request, res: Response) => {
  const payments = await paymentsService.fetchPayments({});

  return res.status(HttpStatus.OK).json({ data: payments });
};

/**
 * Get a payment by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchPaymentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = await paymentsService.fetchPaymentById(Number(id), {});

  if (!payment) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Payment not found' });
  }

  return res.status(HttpStatus.OK).json({ data: payment });
};

/**
 * Create a new payment.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createPayment = async (req: Request, res: Response) => {
  const payment = await paymentsService.createPayment(req.body);

  return res.status(HttpStatus.CREATED).json({ data: payment });
};

/**
 * Update a payment by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updatePaymentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = await paymentsService.updatePaymentById(Number(id), req.body);

  if (!payment) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Payment not found' });
  }

  return res.status(HttpStatus.OK).json({ data: payment });
};

/**
 * Delete a payment by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deletePaymentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await paymentsService.deletePaymentById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Payment not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
