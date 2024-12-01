import { Knex } from 'knex';

import CafeModel from '@/modules/cafes/cafes.model';

import BaseModel from '@/models/baseModel';

import logger from '@/services/logger';

import { NotFoundError } from '@/errors/errors';

import { Any, Cafe } from '@/types/common';

import { getCurrentUser } from '../user/user.service';

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

/**
 * Fetch a cafe by its ID.
 *
 * @param  id
 * @param  filters
 * @param  trx
 */
export const fetchCafeById = async (
  id: number,
  filters: Partial<Cafe>,
  trx?: Knex.Transaction
): Promise<Cafe | null> => {
  log.info(`Fetching cafe with ID ${id}`);

  const cafe = await CafeModel.fetchById(id, filters, trx);

  if (!cafe) {
    throw new NotFoundError('Cafe not found.');
  }

  return cafe;
};

/**
 * Create a new cafe.
 *
 * @param  data
 * @param  trx
 */
export const createCafe = async (data: Partial<Cafe>, trx?: Knex.Transaction): Promise<Cafe> => {
  log.info('Creating a new cafe');

  const { name, collegeId, location, managerIds } = data;

  const currentUser = await getCurrentUser();

  try {
    const newCafe = await BaseModel.transaction(async trx => {
      const cafe = await CafeModel.insert(
        { collegeId, name, location, imageUrl: data.imageUrl, createdBy: currentUser.id },
        trx
      );

      await CafeModel.insertCafeManager(cafe.id, managerIds, trx);

      const newCafe = await CafeModel.fetchById(cafe.id, {}, trx);

      return newCafe;
    });

    return newCafe;
  } catch (e) {
    log.error('Error creating cafe', e);
    throw e;
  }
};

/**
 * Update a cafe by its ID.
 *
 * @param  id
 * @param  data
 * @param  trx
 */
export const updateCafe = async (
  id: number,
  data: Partial<Cafe>,
  trx?: Knex.Transaction
): Promise<Cafe> => {
  log.info(`Updating cafe with ID ${id}`);

  const { name, collegeId, location, managerIds, imageUrl } = data;
  const currentUser = await getCurrentUser();

  const existingCafe = await CafeModel.fetchById(id, {}, trx);

  if (!existingCafe) {
    throw new NotFoundError('Cafe not found.');
  }

  try {
    const updatedCafe = await BaseModel.transaction(async trx => {
      await CafeModel.update(
        id,
        {
          name,
          collegeId,
          location,
          imageUrl,
          updatedBy: currentUser.id,
        },
        trx
      );

      const existingCafeManagers = await CafeModel.fetchCafeManagers(id, trx);

      const existingManagerIds = existingCafeManagers.map(manager => manager.id);

      const managerIdsToAdd = managerIds.filter(id => !existingManagerIds.includes(id));
      const managerIdsToRemove = existingManagerIds.filter(id => !managerIds.includes(id));

      if (managerIdsToAdd.length) {
        await CafeModel.insertCafeManager(id, managerIdsToAdd, trx);
      }

      if (managerIdsToRemove.length) {
        await CafeModel.deleteCafeManager(id, managerIdsToRemove, trx);
      }

      const updatedCafe = await CafeModel.fetchById(id, {}, trx as Knex.Transaction);

      if (!updatedCafe) {
        throw new NotFoundError('Cafe not found after update.');
      }

      return updatedCafe;
    });
    return updatedCafe;
  } catch (e) {
    log.error('Error updating cafe', e);
    throw e;
  }
};

/**
 * Delete a cafe by its ID.
 *
 * @param  id
 * @param  trx
 */
export const deleteCafe = async (id: number, trx?: Knex.Transaction): Promise<void> => {
  log.info(`Deleting cafe with ID ${id}`);

  await BaseModel.transaction(async trx => {
    await CafeModel.deleteCafeManagersByCafeId(id, trx);
    await CafeModel.delete(id, trx);
  });

  return;
};
