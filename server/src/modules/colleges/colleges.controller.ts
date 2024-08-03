import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as collegesService from './colleges.service';

/**
 * Get all colleges.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchColleges = async (req: Request, res: Response) => {
  const colleges = await collegesService.fetchColleges({});

  return res.status(HttpStatus.OK).json({ data: colleges });
};

/**
 * Get a college by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchCollegeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const college = await collegesService.fetchCollegeById(Number(id), {});

  if (!college) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'College not found' });
  }

  return res.status(HttpStatus.OK).json({ data: college });
};

/**
 * Create a new college.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createCollege = async (req: Request, res: Response) => {
  const college = await collegesService.createCollege(req.body);

  return res.status(HttpStatus.CREATED).json({ data: college });
};

/**
 * Update a college by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateCollegeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const college = await collegesService.updateCollegeById(Number(id), req.body);

  if (!college) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'College not found' });
  }

  return res.status(HttpStatus.OK).json({ data: college });
};

/**
 * Delete a college by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteCollegeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await collegesService.deleteCollegeById(Number(id));

  if (!success) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'College not found' });
  }

  return res.status(HttpStatus.NO_CONTENT).send();
};
