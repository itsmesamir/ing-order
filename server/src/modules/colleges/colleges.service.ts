import { Knex } from 'knex';

import CollegeModel from '@/modules/colleges/colleges.model';

import logger from '@/services/logger';

import { Any, College } from '@/types/common';

const log = logger.withNamespace('modules/colleges.service');

/**
 * Fetch list of colleges.
 *
 * @returns A promise that resolves to an array of colleges objects.
 */
export const fetchColleges = async (params: Any, trx?: Knex.Transaction): Promise<College[]> => {
  log.info('Fetching colleges');

  const colleges = await CollegeModel.fetch(params, trx);

  return colleges;
};

/**
 * Fetch a college by its ID.
 *
 * @param {number} id
 * @param {Any} filters
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<College | null>}
 */
export const fetchCollegeById = async (
  id: number,
  filters: Any,
  trx?: Knex.Transaction
): Promise<College | null> => {
  log.info(`Fetching college with ID ${id}`);

  const college = await CollegeModel.fetchById(id, filters, trx);

  return college;
};

/**
 * Create a new college.
 *
 * @param {Partial<College>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<College>}
 */
export const createCollege = async (
  data: Partial<College>,
  trx?: Knex.Transaction
): Promise<College> => {
  log.info('Creating new college');

  const [id] = await CollegeModel.insert(data, trx);

  const newCollege = await CollegeModel.fetchById(id, {}, trx);

  return newCollege;
};

/**
 * Update a college by its ID.
 *
 * @param {number} id
 * @param {Partial<College>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<College | null>}
 */
export const updateCollegeById = async (
  id: number,
  data: Partial<College>,
  trx?: Knex.Transaction
): Promise<College | null> => {
  log.info(`Updating college with ID ${id}`);

  await CollegeModel.updateById(id, data, trx);

  const updatedCollege = await CollegeModel.fetchById(id, {}, trx);

  return updatedCollege;
};

/**
 * Delete a college by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteCollegeById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting college with ID ${id}`);

  const rowsDeleted = await CollegeModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
