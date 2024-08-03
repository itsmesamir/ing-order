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
