import { Knex } from 'knex';

/**
 * Delete existing entries and seed values for TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('departments').del();
  // Inserts seed entries
  await knex('departments').insert([
    { id: 1, name: 'Academics', created_by: 1 },
    { id: 2, name: 'RTE', created_by: 1 },
    { id: 3, name: 'Student service', created_by: 1 },
    { id: 4, name: 'BD', created_by: 1 },
    { id: 5, name: 'Sales', created_by: 1 },
    { id: 6, name: 'Marketing', created_by: 1 },
    { id: 7, name: 'Student', created_by: 1 },
    { id: 8, name: 'R&D', created_by: 1 },
    { id: 9, name: 'Skills', created_by: 1 },
  ]);
}
