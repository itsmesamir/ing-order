import { Knex } from 'knex';

import logger from '@/services/logger';

import { Any, Role } from '@/types/common';

import RoleModel from './role.model';

const log = logger.withNamespace('modules/roles.service');

/**
 * Fetch list of roles.
 *
 * @returns A promise that resolves to an array of Role objects.
 */
export const getRoles = async (params: Any, trx?: Knex.Transaction): Promise<Role[]> => {
  log.info('Fetching roles');

  const roles = await RoleModel.fetch(params, trx);

  return roles;
};

/**
 * Fetch a role by id.
 *
 * @param id - The role id.
 * @returns A promise that resolves to a Role object.
 */
export const getRoleById = async (id: number, trx?: Knex.Transaction): Promise<Role> => {
  log.info(`Fetching role with id: ${id}`);

  const role = await RoleModel.fetchById(id, trx);

  return role;
};

/**
 * Create a new role.
 *
 * @param data - The role data.
 * @returns A promise that resolves to a Role object.
 */
export const createRole = async (data: Any, trx?: Knex.Transaction): Promise<Role> => {
  log.info('Creating role');

  const [id] = await RoleModel.insert(data, trx);

  const role = await RoleModel.fetchById(id, {}, trx);

  return role;
};

/**
 * Update a role by id.
 *
 * @param id - The role id.
 * @param data - The role data.
 * @returns A promise that resolves to a Role object.
 */
export const updateRole = async (id: number, data: Any, trx?: Knex.Transaction): Promise<Role> => {
  log.info(`Updating role with id: ${id}`);

  const roleId = await RoleModel.update(id, data, trx);

  const role = await RoleModel.fetchById(roleId, {}, trx);

  return role;
};

/**
 * Delete a role by id.
 *
 * @param id - The role id.
 * @returns A promise that resolves to a Role object.
 */
export const deleteRole = async (id: number, trx?: Knex.Transaction): Promise<number> => {
  log.info(`Deleting role with id: ${id}`);

  const role = await RoleModel.delete(id, trx);

  return role;
};
