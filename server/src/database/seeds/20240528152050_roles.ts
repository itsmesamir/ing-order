import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del();

  await knex('roles').insert([
    {
      name: 'Admin',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'Manager',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'College Admin',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'College Manager',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'Super Admin',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'HR',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'Cafe Manager',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
    {
      name: 'Cafe Admin',
      created_at: new Date(),
      created_by: 1,
      updated_at: null,
      updated_by: null,
      deleted_at: null,
      deleted_by: null,
    },
  ]);
}
