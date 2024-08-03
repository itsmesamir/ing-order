import { Knex } from 'knex';

import GroupModel from '@/modules/groups/groups.model';

import logger from '@/services/logger';

import { Any, Group } from '@/types/common';

const log = logger.withNamespace('modules/groups.service');

/**
 * Fetch list of groups.
 *
 * @returns A promise that resolves to an array of groups objects.
 */
export const fetchGroups = async (params: Any, trx?: Knex.Transaction): Promise<Group[]> => {
  log.info('Fetching groups');

  const groups = await GroupModel.fetch(params, trx);

  return groups;
};

/**
 * Fetch a group by its ID.
 *
 * @param {number} id
 * @param {Any} filters
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Group | null>}
 */
export const fetchGroupById = async (
  id: number,
  filters: Any,
  trx?: Knex.Transaction
): Promise<Group | null> => {
  log.info(`Fetching group with ID ${id}`);

  const group = await GroupModel.fetchById(id, filters, trx);

  return group;
};

/**
 * Create a new group.
 *
 * @param {Partial<Group>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Group>}
 */
export const createGroup = async (data: Partial<Group>, trx?: Knex.Transaction): Promise<Group> => {
  log.info('Creating new group');

  const [id] = await GroupModel.insert(data, trx);

  const newGroup = await GroupModel.fetchById(id, {}, trx);

  return newGroup;
};

/**
 * Update a group by its ID.
 *
 * @param {number} id
 * @param {Partial<Group>} data
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<Group | null>}
 */
export const updateGroupById = async (
  id: number,
  data: Partial<Group>,
  trx?: Knex.Transaction
): Promise<Group | null> => {
  log.info(`Updating group with ID ${id}`);

  await GroupModel.updateById(id, data, trx);

  const updatedGroup = await GroupModel.fetchById(id, {}, trx);

  return updatedGroup;
};

/**
 * Delete a group by its ID.
 *
 * @param {number} id
 * @param {Knex.Transaction} [trx]
 * @returns {Promise<boolean>}
 */
export const deleteGroupById = async (id: number, trx?: Knex.Transaction): Promise<boolean> => {
  log.info(`Deleting group with ID ${id}`);

  const rowsDeleted = await GroupModel.deleteById(id, trx);

  return rowsDeleted > 0;
};
