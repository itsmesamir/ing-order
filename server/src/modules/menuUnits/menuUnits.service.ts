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
