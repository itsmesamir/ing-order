import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as menuCategoriesService from './menuCategories.service';

/**
 * Get all menu categories.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchMenuCategories = async (req: Request, res: Response) => {
  const menuCategories = await menuCategoriesService.fetchMenuCategories({});

  return res.status(HttpStatus.OK).json({ data: menuCategories });
};

/**
 * Create a new menu item.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createMenuCategory = async (req: Request, res: Response) => {
  const menuCategory = await menuCategoriesService.createMenuCategory(req.body);

  return res.status(HttpStatus.CREATED).json({ data: menuCategory });
};

/**
 * Update a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateMenuCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const menuCategory = await menuCategoriesService.updateMenuCategoryById(Number(id), req.body);

  if (!menuCategory) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuItem not found' });
  }

  return res.status(HttpStatus.OK).json({ data: menuCategory });
};

/**
 * Delete a menu item by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteMenuCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await menuCategoriesService.deleteMenuCategoryById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'MenuCategory not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
