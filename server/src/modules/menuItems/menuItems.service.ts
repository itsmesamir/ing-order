import { Knex } from 'knex';

import MenuItemModel from '@/modules/menuItems/menuItems.model';

import logger from '@/services/logger';

import { Any, MenuItem } from '@/types/common';

const log = logger.withNamespace('modules/menuItems.service');

/**
 * Fetch list of menu items.
 *
 * @returns A promise that resolves to an array of menu items objects.
 */
export const fetchMenuItems = async (params: Any, trx?: Knex.Transaction): Promise<MenuItem[]> => {
  log.info('Fetching menu items');

  const menuItems = await MenuItemModel.fetch(params, trx);

  return menuItems;
};

/**
 * Fetch a menu item by its ID.
 *
 * @param {number} id
 * @param {Any} filters
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuItem>}
 */
export const fetchMenuItemById = async (
  id: number,
  filters: Any,
  trx?: Knex.Transaction
): Promise<MenuItem | null> => {
  log.info(`Fetching menu item with ID ${id}`);

  const menuItem = await MenuItemModel.fetchById(id, filters, trx);

  return menuItem;
};

/**
 * Create a new menu item.
 *
 * @param {Partial<MenuItem>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuItem>}
 */
export const createMenuItem = async (
  data: Partial<MenuItem>,
  trx?: Knex.Transaction
): Promise<MenuItem> => {
  log.info('Creating new menu item');

  const [id] = await MenuItemModel.insert(data, trx);

  const newMenuItem = await MenuItemModel.fetchById(id, {}, trx);

  return newMenuItem;
};

/**
 * Update a menu item by its ID.
 *
 * @param {number} id
 * @param {Partial<MenuItem>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuItem | null>}
 */
export const updateMenuItemById = async (
  id: number,
  data: Partial<MenuItem>,
  trx?: Knex.Transaction
): Promise<MenuItem | null> => {
  log.info(`Updating menu item with ID ${id}`);

  await MenuItemModel.updateById(id, data, trx);

  const updatedMenuItem = await MenuItemModel.fetchById(id, {}, trx);

  return updatedMenuItem;
};

/**
 * Delete a menu item by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteMenuItemById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting menu item with ID ${id}`);

  const rowsDeleted = await MenuItemModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
