import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as menuUnitsService from './menuUnits.service';

/**
 * Get all menu Units.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchMenuUnits = async (req: Request, res: Response) => {
  const menuUnits = await menuUnitsService.fetchMenuUnits({});

  return res.status(HttpStatus.OK).json({ data: menuUnits });
};
