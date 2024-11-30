import { Knex } from 'knex';

/**
 * Delete existing entries and seed values for TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('courses').del();
  // Inserts seed entries
  await knex('courses').insert([
    { id: 1, name: 'Science', created_by: 1 },
    { id: 2, name: 'Math', created_by: 1 },
  ]);
}
