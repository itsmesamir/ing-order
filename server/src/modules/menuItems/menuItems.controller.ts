import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as menuItemsService from './menuItems.service';

/**
 * Get all menu items.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchMenuItems = async (req: Request, res: Response) => {
  const menuItems = await menuItemsService.fetchMenuItems({});

  return res.status(HttpStatus.OK).json({ data: menuItems });
};

/**
 * Get a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchMenuItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const menuItem = await menuItemsService.fetchMenuItemById(Number(id), {});

  if (!menuItem) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuItem not found' });
  }

  return res.status(HttpStatus.OK).json({ data: menuItem });
};

/**
 * Create a new menu item.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createMenuItem = async (req: Request, res: Response) => {
  const menuItem = await menuItemsService.createMenuItem(req.body);

  return res.status(HttpStatus.CREATED).json({ data: menuItem });
};

/**
 * Update a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateMenuItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const menuItem = await menuItemsService.updateMenuItemById(Number(id), req.body);

  if (!menuItem) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuItem not found' });
  }

  return res.status(HttpStatus.OK).json({ data: menuItem });
};

/**
 * Delete a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteMenuItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await menuItemsService.deleteMenuItemById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuItem not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
