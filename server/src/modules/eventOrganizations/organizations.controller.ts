// organizations.controller.ts

import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as organizationsService from './organizations.service';

/**
 * Get all organizations.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchOrganizations = async (req: Request, res: Response) => {
  const organizations = await organizationsService.fetchOrganizations(req.query);

  return res.status(HttpStatus.OK).json({ data: organizations });
};

/**
 * Get an organization by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchOrganizationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organization = await organizationsService.fetchOrganizationById(Number(id), req.query);

  if (!organization) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Organization not found' });
  }

  return res.status(HttpStatus.OK).json({ data: organization });
};

/**
 * Create a new organization.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createOrganization = async (req: Request, res: Response) => {
  const organization = await organizationsService.createOrganization(req.body);

  return res.status(HttpStatus.CREATED).json({ data: organization });
};

/**
 * Update an organization by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateOrganizationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organization = await organizationsService.updateOrganizationById(Number(id), req.body);

  return res.status(HttpStatus.OK).json({ data: organization });
};

/**
 * Delete an organization by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteOrganizationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await organizationsService.deleteOrganizationById(Number(id));

  return res.status(HttpStatus.NO_CONTENT).json();
};
