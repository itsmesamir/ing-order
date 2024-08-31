import { Knex } from 'knex';

const ORDER_ITEMS = 'order_items';

enum OrderItemStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

/**
 * Add status column to order_items table.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ORDER_ITEMS, table => {
    table
      .enum('status', [
        OrderItemStatus.PENDING,
        OrderItemStatus.PREPARING,
        OrderItemStatus.READY,
        OrderItemStatus.COMPLETED,
        OrderItemStatus.CANCELLED,
      ])
      .notNullable()
      .defaultTo(OrderItemStatus.PENDING);
  });
}

/**
 * Drop status column to order_items table.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ORDER_ITEMS, table => {
    table.dropColumn('status');
  });
}
