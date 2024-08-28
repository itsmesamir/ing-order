import { Knex } from 'knex';

import MenuCategoryModel from '@/modules/menuCategories/menuCategories.model';

import logger from '@/services/logger';

import { Any, MenuCategory } from '@/types/common';

const log = logger.withNamespace('modules/menuCategories.service');

/**
 * Fetch list of menu categories.
 *
 * @returns A promise that resolves to an array of menu categories objects.
 */
export const fetchMenuCategories = async (
  params: Any,
  trx?: Knex.Transaction
): Promise<MenuCategory[]> => {
  log.info('Fetching menu categories');

  const menuCategories = await MenuCategoryModel.fetch(params, trx);

  return menuCategories;
};

/**
 * Create a new menu item.
 *
 * @param {Partial<MenuItem>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuItem>}
 */
export const createMenuCategory = async (
  data: Partial<MenuCategory>,
  trx?: Knex.Transaction
): Promise<MenuCategory> => {
  log.info('Creating new category item');

  const [id] = await MenuCategoryModel.insert(data, trx);

  const newMenuCategory = await MenuCategoryModel.fetchById(id, {}, trx);

  return newMenuCategory;
};

/**
 * Update a category item by its ID.
 *
 * @param {number} id
 * @param {Partial<MenuCategory>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuCategory | null>}
 */
export const updateMenuCategoryById = async (
  id: number,
  data: Partial<MenuCategory>,
  trx?: Knex.Transaction
): Promise<MenuCategory | null> => {
  log.info(`Updating menu category with ID ${id}`);

  await MenuCategoryModel.updateById(id, data, trx);

  const updatedMenuCategory = await MenuCategoryModel.fetchById(id, {}, trx);

  return updatedMenuCategory;
};

/**
 * Delete a category item by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteMenuCategoryById = async (
  id: number,
  trx?: Knex.Transaction
): Promise<boolean> => {
  log.info(`Deleting menu category with ID ${id}`);

  const rowsDeleted = await MenuCategoryModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
