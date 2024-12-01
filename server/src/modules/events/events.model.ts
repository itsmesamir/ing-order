// events model
import { Knex } from 'knex';

import BaseModel from '@/models/baseModel';

import { EventFilter } from '@/types/events';
import { Event, Order } from '@/types/common';

import db from '@/db';
import dbTables from '@/constants/db';

class EventModel extends BaseModel {
  static events = dbTables.events;
  static eventManagers = dbTables.eventManagers;
  static eventOrders = dbTables.eventOrders;

  /**
   * baseQuery to fetch events.
   *
   * @param {Knex.Transaction} [trx]
   * @returns {Knex.QueryBuilder<Event[]>}
   */
  static baseQuery(trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select(
        'e.id as id',
        'e.name as name',
        'e.location as location',
        'e.description as description',
        'e.start_date as startDate',
        'e.end_date as endDate',
        'e.created_at',
        'e.updated_at',
        db.raw(`
        JSON_ARRAYAGG(
          CASE 
            WHEN em.manager_id IS NOT NULL THEN
              JSON_OBJECT(
                'id', em.manager_id,
                'name', u.name,
                'email', u.email,
                'phone', u.phone
              )
          END
        ) as managers
      `)
      )
      .from(`${this.events} as e`)
      .leftJoin(`${this.eventManagers} as em`, 'e.id', 'em.event_id')
      .leftJoin(`${dbTables.users} as u`, 'em.manager_id', 'u.id')
      .groupBy('e.id');
  }

  /**
   * Inject filters to the baseQuery.
   *
   * @param {Knex.QueryBuilder} query
   * @param {Partial<Event>} filters
   */
  static injectFilter(query: Knex.QueryBuilder, filters: EventFilter) {
    const { name, startDate, endDate } = filters;

    if (name) {
      query.where('e.name', 'like', `%${name}%`);
    }

    if (startDate) {
      query.where('e.start_date', '>=', startDate);
    }

    if (endDate) {
      query.where('e.end_date', '<=', endDate);
    }
  }

  /**
   * Fetch events.
   *
   * @param {EventFilter} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Event[]>}
   */
  static fetch(filters: EventFilter, trx?: Knex.Transaction): Promise<Event[]> {
    const query = this.baseQuery(trx);

    this.injectFilter(query, filters);

    return query;
  }

  /**
   * Fetch orders by event ID.
   *
   * @param {number} eventId
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Order[]>}
   *
   * */
  static async fetchOrdersByEventId(eventId: number, trx?: Knex.Transaction): Promise<Order[]> {
    const orders = await this.queryBuilder(trx)
      .select(
        'eo.id as id',
        'eo.event_id as eventId',
        'eo.user_id as userId',
        'eo.status as status',
        'eo.created_at',
        'eo.updated_at',
        db.raw(`
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', eoi.id,
            'order_id', eoi.order_id,
            'item_id', eoi.item_id,
            'quantity', eoi.quantity,
            'price', eoi.price,
            'discount', eoi.discount,
            'created_by', eoi.created_by,
            'created_at', eoi.created_at,
            'updated_by', eoi.updated_by,
            'updated_at', eoi.updated_at,
            'deleted_by', eoi.deleted_by,
            'deleted_at', eoi.deleted_at,
            'status', eoi.status
          )
        ) as orderItems
      `)
      )
      .from(`${this.eventOrders} as eo`)
      .leftJoin(`${dbTables.orderItems} as eoi`, 'eo.id', 'eoi.order_id')
      .where('eo.event_id', eventId)
      .groupBy('eo.id');

    return orders;
  }

  /**
   * Fetch an event by its ID.
   *
   * @param {number} id
   * @param {Partial<Event>} filters
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Event | null>}
   * @throws {NotFoundError}
   * @throws {Error}
   */
  static async fetchById(
    id: number,
    filters: Partial<Event>,
    trx?: Knex.Transaction
  ): Promise<Event | null> {
    const event = await this.baseQuery(trx).where('e.id', id).first();

    return event;
  }

  /**
   * Create a new event.
   *
   * @param {Event} event
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Event>}
   */
  static async create(event: Partial<Event>, trx?: Knex.Transaction): Promise<Event> {
    const [eventId] = await this.queryBuilder(trx).table(this.events).insert(event);

    return this.fetchById(eventId, {}, trx);
  }

  /**
   * Create event managers.
   *
   * @param {number} eventId
   * @param {number[]} managerIds
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<void>}
   */
  static async createEventManagers(
    eventId: number,
    managerIds: number[],
    trx?: Knex.Transaction
  ): Promise<void> {
    const eventManagers = managerIds.map(userId => ({ event_id: eventId, manager_id: userId }));

    await this.queryBuilder(trx).table(this.eventManagers).insert(eventManagers);
  }

  /**
   * Delete event managers.
   *
   * @param {number} eventId
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<void>}
   */
  static async deleteEventManagers(
    eventId: number,
    managerIds: number[],
    trx?: Knex.Transaction
  ): Promise<void> {
    await this.queryBuilder(trx)
      .table(this.eventManagers)
      .where('event_id', eventId)
      .whereIn('manager_id', managerIds)
      .del();
  }

  /**
   * Delete event managers by event ID.
   *
   * @param {number} eventId
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<void>}
   * @throws {Error}
   */
  static async deleteEventManagersByEventId(
    eventId: number,
    trx?: Knex.Transaction
  ): Promise<void> {
    await this.queryBuilder(trx).table(this.eventManagers).where('event_id', eventId).del();
  }

  /**
   * Fetch event managers.
   *
   * @param {number} eventId
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<User[]>}
   */
  static async fetchEventManagers(eventId: number, trx?: Knex.Transaction) {
    return this.queryBuilder(trx)
      .select('u.*')
      .from({ em: this.eventManagers })
      .join({ u: dbTables.users }, 'u.id', 'em.manager_id')
      .where('em.event_id', eventId);
  }

  /**
   * Update an event by its ID.
   *
   * @param {number} id
   * @param {Event} event
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<Event>}
   */
  static async updateById(
    id: number,
    event: Partial<Event>,
    trx?: Knex.Transaction
  ): Promise<Event> {
    await this.queryBuilder(trx).table(this.events).where('id', id).update(event);

    return this.fetchById(id, {}, trx);
  }

  /**
   * Delete an event by its ID.
   *
   * @param {number} id
   * @param {Knex.Transaction} [trx]
   * @returns {Promise<void>}
   */
  static async deleteById(id: number, trx?: Knex.Transaction): Promise<void> {
    return this.queryBuilder(trx).table(this.events).where('id', id).del();
  }
}

export default EventModel;
