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
