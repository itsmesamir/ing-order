// events service
import { Knex } from 'knex';
import moment from 'moment';

import EventModel from '@/modules/events/events.model';

import BaseModel from '@/models/baseModel';

import logger from '@/services/logger';

import { buildPageParams } from '@/utils/pagination';

import { BadRequestError, NotFoundError } from '@/errors/errors';

import { Event } from '@/types/common';
import { EventFilter } from '@/types/events';

import { getCurrentUser } from '../user/user.service';

const log = logger.withNamespace('modules/events.service');

/**
 * Fetch list of events.
 *
 * @returns A promise that resolves to an array of event objects.
 */
export const fetchEvents = async (
  params: EventFilter,
  trx?: Knex.Transaction
): Promise<Event[]> => {
  const { size, page } = params;

  const pageParams = buildPageParams(page, size);

  log.info('Fetching events');

  const events = await EventModel.fetch(params, trx);

  return events;
};

/**
 * Fetch an event by its ID.
 *
 * @param  id
 * @param  filters
 * @param  trx
 */
export const fetchEventById = async (
  id: number,
  filters: Partial<Event>,
  trx?: Knex.Transaction
): Promise<Event | null> => {
  log.info(`Fetching event with ID ${id}`);

  const event = await EventModel.fetchById(id, filters, trx);

  if (!event) {
    throw new NotFoundError('Event not found.');
  }

  return event;
};

/**
 * Create a new event.
 *
 * @param  event
 * @param  trx
 */
export const createEvent = async (event: Event, trx?: Knex.Transaction): Promise<Event> => {
  log.info('Creating new event');

  const {
    name,
    location,
    description,
    startDate,
    endDate,
    managerIds: eventManagers,
    organizerId,
  } = event;

  if (!organizerId) {
    throw new BadRequestError('Organization ID is required.');
  }

  if (!eventManagers || eventManagers.length === 0) {
    throw new BadRequestError('Event managers are required.');
  }

  const currentUser = await getCurrentUser();

  try {
    const newEvent = await BaseModel.transaction(async transaction => {
      const eventData = {
        name,
        location,
        description,
        startDate,
        endDate,
        organizerId,
        createdBy: currentUser.id,
      };
      const createdEvent = await EventModel.create(eventData, transaction);

      await EventModel.createEventManagers(createdEvent.id, eventManagers, transaction);

      const newEvent = await EventModel.fetchById(createdEvent.id, {}, transaction);

      return newEvent;
    });

    return newEvent;
  } catch (error) {
    log.error('Error creating new event', error);
    throw error;
  }
};

/**
 * Update an event by its ID.
 *
 * @param  id
 * @param  event
 * @param  trx
 */
export const updateEventById = async (
  id: number,
  event: Partial<Event>,
  trx?: Knex.Transaction
): Promise<Event> => {
  log.info(`Updating event with ID ${id}`);

  const { name, location, description, startDate, endDate, managerIds } = event;
  const currentUser = await getCurrentUser();

  const existingEvent = await EventModel.fetchById(id, {}, trx);

  if (!existingEvent) {
    throw new NotFoundError('Event not found.');
  }

  try {
    const updatedEvent = await BaseModel.transaction(async transaction => {
      await EventModel.updateById(
        id,
        {
          name,
          location,
          description,
          startDate,
          endDate,
          updatedBy: currentUser.id,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        transaction
      );

      const existingEventManagers = await EventModel.fetchEventManagers(id, transaction);

      const existingManagerIds = existingEventManagers.map(manager => manager.id);

      const managerIdsToAdd = managerIds.filter(
        managerId => !existingManagerIds.includes(managerId)
      );
      const managerIdsToRemove = existingManagerIds.filter(
        managerId => !managerIds.includes(managerId)
      );

      if (managerIdsToAdd.length > 0) {
        await EventModel.createEventManagers(id, managerIdsToAdd, transaction);
      }

      if (managerIdsToRemove.length > 0) {
        await EventModel.deleteEventManagers(id, managerIdsToRemove, transaction);
      }

      const updatedEvent = await EventModel.fetchById(id, {}, transaction);

      if (!updatedEvent) {
        throw new NotFoundError('Event not found.');
      }

      return updatedEvent;
    });

    return updatedEvent;
  } catch (error) {
    log.error('Error updating event', error);
    throw error;
  }
};

/**
 * Delete an event by its ID.
 *
 * @param  id
 * @param  trx
 */
export const deleteEventById = async (id: number, trx?: Knex.Transaction): Promise<void> => {
  log.info(`Deleting event with ID ${id}`);

  await BaseModel.transaction(async transaction => {
    await EventModel.deleteEventManagersByEventId(id, transaction);
    await EventModel.deleteById(id, transaction);
  });
};
