import { Knex } from 'knex';

import MenuUnitModel from '@/modules/menuUnits/menuUnits.model';

import logger from '@/services/logger';

import { Any, MenuUnit } from '@/types/common';

const log = logger.withNamespace('modules/menuUnits.service');

/**
 * Fetch list of menu Units.
 *
 * @returns A promise that resolves to an array of menu Units objects.
 */
export const fetchMenuUnits = async (params: Any, trx?: Knex.Transaction): Promise<MenuUnit[]> => {
  log.info('Fetching menu units');

  const menuUnits = await MenuUnitModel.fetch(params, trx);

  return menuUnits;
};

/**
 * Create a new menu item.
 *
 * @param {Partial<MenuItem>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuItem>}
 */
export const createMenuUnit = async (
  data: Partial<MenuUnit>,
  trx?: Knex.Transaction
): Promise<MenuUnit> => {
  log.info('Creating new category item');

  const [id] = await MenuUnitModel.insert(data, trx);

  const newMenuUnit = await MenuUnitModel.fetchById(id, {}, trx);

  return newMenuUnit;
};

/**
 * Update a category item by its ID.
 *
 * @param {number} id
 * @param {Partial<MenuUnit>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<MenuUnit | null>}
 */
export const updateMenuUnitById = async (
  id: number,
  data: Partial<MenuUnit>,
  trx?: Knex.Transaction
): Promise<MenuUnit | null> => {
  log.info(`Updating menu category with ID ${id}`);

  await MenuUnitModel.updateById(id, data, trx);

  const updatedMenuUnit = await MenuUnitModel.fetchById(id, {}, trx);

  return updatedMenuUnit;
};

/**
 * Delete a category item by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteMenuUnitById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting menu category with ID ${id}`);

  const rowsDeleted = await MenuUnitModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
