// organizations service
import { Knex } from 'knex';

import OrganizationModel from '@/modules/eventOrganizations/organizations.model';

import BaseModel from '@/models/baseModel';

import logger from '@/services/logger';

import { buildPageParams } from '@/utils/pagination';

import { BadRequestError, NotFoundError } from '@/errors/errors';

import { Organization } from '@/types/common';
import { OrganizationFilter } from '@/types/organizations';

const log = logger.withNamespace('modules/organizations.service');

/**
 * Fetch list of organizations.
 *
 * @returns A promise that resolves to an array of organization objects.
 */
export const fetchOrganizations = async (
  params: OrganizationFilter,
  trx?: Knex.Transaction
): Promise<Organization[]> => {
  const { size, page } = params;

  const pageParams = buildPageParams(page, size);

  log.info('Fetching organizations');

  const organizations = await OrganizationModel.fetch(params, trx);

  return organizations;
};

/**
 * Fetch an organization by its ID.
 *
 * @param  id
 * @param  filters
 * @param  trx
 * */
export const fetchOrganizationById = async (
  id: number,
  filters: Partial<Organization>,
  trx?: Knex.Transaction
): Promise<Organization | null> => {
  log.info(`Fetching organization with ID ${id}`);

  const organization = await OrganizationModel.fetchById(id, filters, trx);

  if (!organization) {
    throw new NotFoundError('Organization not found.');
  }

  return organization;
};

/**
 * Create a new organization.
 *
 * @param  data
 * @param  trx
 */
export const createOrganization = async (
  data: Partial<Organization>,
  trx?: Knex.Transaction
): Promise<Organization> => {
  log.info('Creating new organization');

  const organization = await OrganizationModel.create(data, trx);

  return organization;
};

/**
 * Update an organization by its ID.
 *
 * @param  id
 * @param  data
 * @param  trx
 */
export const updateOrganizationById = async (
  id: number,
  data: Partial<Organization>,
  trx?: Knex.Transaction
): Promise<Organization> => {
  log.info(`Updating organization with ID ${id}`);

  const organization = await OrganizationModel.updateById(id, data, trx);

  return organization;
};

/**
 * Delete an organization by its ID.
 *
 * @param  id
 * @param  trx
 */
export const deleteOrganizationById = async (id: number, trx?: Knex.Transaction): Promise<void> => {
  log.info(`Deleting organization with ID ${id}`);

  await OrganizationModel.deleteById(id, trx);
};
