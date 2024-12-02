import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as cafesService from './cafes.service';

/**
 * Get all cafes.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchCafes = async (req: Request, res: Response) => {
  const cafes = await cafesService.fetchCafes({});

  return res.status(HttpStatus.OK).json({ data: cafes });
};

/**
 * Get a cafe by its ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchCafeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cafe = await cafesService.fetchCafeById(Number(id), {});

  return res.status(HttpStatus.OK).json({ data: cafe });
};

/**
 * Create a new cafe.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createCafe = async (req: Request, res: Response) => {
  const cafe = await cafesService.createCafe(req.body);

  return res.status(HttpStatus.CREATED).json({ data: cafe });
};

/**
 * Update a cafe by its ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateCafe = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cafe = await cafesService.updateCafe(Number(id), req.body);

  return res.status(HttpStatus.OK).json({ data: cafe });
};

/**
 * Delete a cafe by its ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteCafe = async (req: Request, res: Response) => {
  const { id } = req.params;

  await cafesService.deleteCafe(Number(id));

  return res.status(HttpStatus.NO_CONTENT).json();
};
