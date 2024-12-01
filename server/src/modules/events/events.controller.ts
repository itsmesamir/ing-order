// events controller
import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as eventsService from './events.service';

/**
 * Get all events.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchEvents = async (req: Request, res: Response) => {
  const events = await eventsService.fetchEvents(req.query);

  return res.status(HttpStatus.OK).json({ data: events });
};

/**
 * Get an event by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await eventsService.fetchEventById(Number(id), req.query);

  if (!event) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Event not found' });
  }

  return res.status(HttpStatus.OK).json({ data: event });
};

/**
 * Create a new event.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createEvent = async (req: Request, res: Response) => {
  const event = await eventsService.createEvent(req.body);

  return res.status(HttpStatus.CREATED).json({ data: event });
};

/**
 * Update an event by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await eventsService.updateEventById(Number(id), req.body);

  return res.status(HttpStatus.OK).json({ data: event });
};

/**
 * Delete an event by ID.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const deleteEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await eventsService.deleteEventById(Number(id));

  return res.status(HttpStatus.NO_CONTENT).json();
};
