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

/**
 * Create a new menu item.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createMenuUnit = async (req: Request, res: Response) => {
  const menuUnit = await menuUnitsService.createMenuUnit(req.body);

  return res.status(HttpStatus.CREATED).json({ data: menuUnit });
};

/**
 * Update a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateMenuUnitById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const menuUnit = await menuUnitsService.updateMenuUnitById(Number(id), req.body);

  if (!menuUnit) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuUnit not found' });
  }

  return res.status(HttpStatus.OK).json({ data: menuUnit });
};

/**
 * Delete a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteMenuUnitById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await menuUnitsService.deleteMenuUnitById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuUnit not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
