import { Knex } from 'knex';

import UserRolesModel from '@/modules/user/userRoles.model';
import DesignationModel from '@/modules/designations/designation.model';
import RoleModel from '@/modules/roles/role.model';
import * as designationService from '@/modules/designations/designation.service';

import logger from '@/services/logger';
import { getFromStore } from '@/services/store';

import { compareHash, generateHash } from '@/utils/crypto';

import { BadRequestError } from '@/errors/errors';

import { User, UserFilters } from '@/types/user';
import { Designation, Role, Roles, UserRole } from '@/types/common';

import db from '@/db';

import UserModel from './user.model';
import CountryModel from '../countries/countries.model';

const log = logger.withNamespace('modules/user.service');

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUsers = async (filters: UserFilters, trx?: Knex.Transaction): Promise<User[]> => {
  log.info('Fetching users');

  const users = await UserModel.fetchUserDetails(filters, trx);

  return users;
};

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUserById = async (id: number, trx?: Knex.Transaction): Promise<User> => {
  log.info('Fetching users');

  const user = (await UserModel.fetchById(id, trx)) as User;

  return user;
};

/**
 * Fetch current user.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  log.info('Fetching current user.');

  return getFromStore('currentUser') || null;
};

/**
 * Fetch current user.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchCurrentUser = async (): Promise<User | null> => {
  log.info('Fetching current user.');

  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return null;
  }

  return UserModel.fetchById(currentUser?.id);
};

/**
 * Sign in the user.
 *
 * @param body - The user object containing the sign in details
 * @returns A promise that resolves when the user is signed in.
 */
export const signIn = async (body: { email: string; password: string }): Promise<User> => {
  log.info(`Signing in user with email: ${body.email}`);

  const [existingUser] = await UserModel.fetch({ email: body.email });

  if (!existingUser) {
    throw new BadRequestError('User not found.');
  }

  if (!compareHash(body.password, existingUser.password)) {
    throw new BadRequestError('Email or password does not match.');
  }

  const [user] = await UserModel.fetchUserDetails({ email: body.email });

  return user;
};

/**
 * Sign up a new user.
 *
 * @param user - The user object containing the sign up details.
 * @returns A promise that resolves when the user is signed up.
 */
export const signUp = async (userBody: { password: string } & Omit<User, 'id'>): Promise<User> => {
  log.info(`Signing up new user: ${userBody.email}`);

  const hashedPassword = await generateHash(userBody.password);

  const [existingUser] = await UserModel.fetchUserDetails({ email: userBody.email });

  if (existingUser) {
    throw new BadRequestError('User with email already exists.');
  }

  const insertedUserId = await db.transaction(async (trx: Knex.Transaction): Promise<number> => {
    const designation = await DesignationModel.fetchById(userBody.designationId, trx);

    if (!designation) {
      throw new BadRequestError('Invalid designation.');
    }

    const country = await CountryModel.fetchById(userBody.countryId, trx);

    if (!country) {
      throw new BadRequestError('Invalid country.');
    }

    const roles = await RoleModel.fetch();

    const userRoleId = roles.find((role: Role) => role.name === 'User')?.id;

    if (!userRoleId) {
      throw new BadRequestError('User role not found.');
    }

    const [userId] = await UserModel.insert({ ...userBody, password: hashedPassword }, trx);

    await UserRolesModel.insert({ userId, roleId: userRoleId }, trx);

    return userId;
  });

  const user = await UserModel.fetchById(insertedUserId);

  return user;
};

/**
 * Fetch list of users.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const fetchUserRolesByUserId = async (
  userId: number,
  trx?: Knex.Transaction
): Promise<Role[]> => {
  log.info('Fetching users');

  const roles = (await UserRolesModel.fetch({ userId }, trx)) as Role[];

  return roles;
};

async function updateRoles(
  newRoles: Role[],
  userRoles: UserRole[],
  userId: number,
  trx: Knex.Transaction
): Promise<void> {
  const currentUser = await getCurrentUser();
  const toCreate = newRoles.filter(role => !userRoles.find(r => r.id === role.id));
  const toDelte = userRoles.filter(role => !newRoles.find(r => r.id === role.id));

  if (toCreate.length) {
    await UserRolesModel.insert(
      toCreate.map(data => ({ roleId: data.id, userId, createdBy: currentUser.id })),
      trx
    );
  }

  if (toDelte.length) {
    toDelte.map(async data => await UserRolesModel.deleteById(data.userRoleId, trx));
  }

  return;
}

/**
 * Update the user.
 *
 * @param id - The ID of the user to update.
 * @param userBody - The user object containing the updated details.
 * @returns A promise that resolves when the user is updated.
 */
export const updateUserById = async (id: number, body: Partial<User>): Promise<User> => {
  log.info(`Updating user with ID: ${id}`);

  const { roleIds, ...userBody } = body;

  const { designationId, managerId } = userBody;

  const [existingUser] = await UserModel.fetchUserDetails({ id });

  if (!existingUser) {
    throw new BadRequestError('User not found.');
  }

  const designationPromise = designationId
    ? designationService.fetchDesignationById(designationId)
    : Promise.resolve(null);

  const rolesPromise = roleIds?.length ? RoleModel.fetch({ roleIds }) : Promise.resolve(null);

  const userRolesPrmise = roleIds?.length ? fetchUserRolesByUserId(id) : Promise.resolve([]);

  const managerPromise = managerId ? fetchUserById(managerId) : Promise.resolve(null);

  const [designation, roles, userRoles, manager]: [Designation, Role[], UserRole[], User | null] =
    await Promise.all([designationPromise, rolesPromise, userRolesPrmise, managerPromise]);

  if (designationId && !designation?.id) {
    throw new BadRequestError('Designation not found.');
  }

  if (roleIds.length && roleIds?.length !== roles.length) {
    throw new BadRequestError('Role not found.');
  }

  if (managerId && !manager?.id) {
    throw new BadRequestError('Manager not found.');
  }

  if (managerId && !manager?.roles.find(r => r.name === Roles.MANAGER)) {
    throw new BadRequestError('Only user with manager role can be assigned as manager.');
  }

  if (managerId && manager.id === existingUser.id) {
    throw new BadRequestError('User cannot be assigned as manager to themselves.');
  }

  await db.transaction(async trx => {
    await updateRoles(roles, userRoles, id, trx);

    const userId = await UserModel.update(id, userBody, trx);

    return userId;
  });

  const user = await UserModel.fetchById(id);

  return user;
};

/**
 * Fetch user roles.
 *
 * @param id - The ID of the user to fetch roles for.
 * @returns A promise that resolves to an array of Role objects.
 */
export const fetchUserRoles = async (id: number): Promise<Role[]> => {
  log.info(`Fetching user roles for user with ID: ${id}`);

  const roles = (await fetchUserRolesByUserId(id)) as Role[];

  return roles;
};

/**
 * create, update or delete user roles.
 *
 * @param id - The ID of the user to update.
 * @param roles - The roles to update.
 * @returns A promise that resolves when the user roles are updated.
 */
export const upsertUserRoles = async (id: number, roles: Role[]): Promise<void> => {
  log.info(`Upserting user roles for user with ID: ${id}`);

  const userRoles = (await fetchUserRolesByUserId(id)) as UserRole[];

  await db.transaction(async trx => {
    await updateRoles(roles, userRoles, id, trx);
  });

  return;
};
