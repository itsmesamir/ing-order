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

  console.log({ menuCategories });

  return res.status(HttpStatus.OK).json({ data: menuCategories });
};
