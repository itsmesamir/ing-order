import { Knex } from 'knex';

import CafeModel from '@/modules/cafes/cafes.model';

import logger from '@/services/logger';

import { Any, Cafe } from '@/types/common';

const log = logger.withNamespace('modules/cafes.service');

/**
 * Fetch list of cafes.
 *
 * @returns A promise that resolves to an array of cafes objects.
 */
export const fetchCafes = async (params?: Any, trx?: Knex.Transaction): Promise<Cafe[]> => {
  log.info('Fetching cafes');

  const cafes = await CafeModel.fetch(params, trx);

  return cafes;
};
