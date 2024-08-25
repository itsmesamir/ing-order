import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as roleService from './role.service';

/**
 * Get all roles.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getRoles = async (req: Request, res: Response) => {
  const roles = await roleService.getRoles({});

  return res.status(HttpStatus.OK).json({ data: roles });
};

/**
 * Get role by id.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const getRole = async (req: Request, res: Response) => {
  const role = await roleService.getRoleById(+req.params.id);

  return res.status(HttpStatus.OK).json({ data: role });
};

/**
 * Create new role.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createRole = async (req: Request, res: Response) => {
  const role = await roleService.createRole(req.body);

  return res.status(HttpStatus.CREATED).json({ data: role });
};

/**
 * Update role by id.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateRole = async (req: Request, res: Response) => {
  const role = await roleService.updateRole(+req.params.id, req.body);

  return res.status(HttpStatus.OK).json({ data: role });
};

/**
 * Delete role by id.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteRole = async (req: Request, res: Response) => {
  await roleService.deleteRole(+req.params.id);

  return res.status(HttpStatus.NO_CONTENT).send();
};
