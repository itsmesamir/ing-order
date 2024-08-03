import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as groupsService from './groups.service';

/**
 * Get all groups.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchGroups = async (req: Request, res: Response) => {
  const groups = await groupsService.fetchGroups({});

  return res.status(HttpStatus.OK).json({ data: groups });
};

/**
 * Get a group by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchGroupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await groupsService.fetchGroupById(Number(id), {});

  if (!group) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Group not found' });
  }

  return res.status(HttpStatus.OK).json({ data: group });
};

/**
 * Create a new group.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createGroup = async (req: Request, res: Response) => {
  const group = await groupsService.createGroup(req.body);

  return res.status(HttpStatus.CREATED).json({ data: group });
};

/**
 * Update a group by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateGroupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await groupsService.updateGroupById(Number(id), req.body);

  if (!group) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Group not found' });
  }

  return res.status(HttpStatus.OK).json({ data: group });
};

/**
 * Delete a group by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteGroupById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await groupsService.deleteGroupById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Group not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
