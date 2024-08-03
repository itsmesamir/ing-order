import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('roles_permissions').del();

  // Insert seed entries
  await knex('roles_permissions').insert([
    {
      role_id: 1,
      permission_id: 1,
      created_at: new Date(),
      updated_by: 1,
      updated_at: new Date(),
    },
    {
      role_id: 1,
      permission_id: 2,
      created_at: new Date(),
      updated_by: 1,
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 3,
      created_at: new Date(),
      updated_by: 2,
      updated_at: new Date(),
    },
    {
      role_id: 2,
      permission_id: 4,
      created_at: new Date(),
      updated_by: 2,
      updated_at: new Date(),
    },
    {
      role_id: 3,
      permission_id: 1,
      created_at: new Date(),
      updated_by: 3,
      updated_at: new Date(),
    },
    {
      role_id: 3,
      permission_id: 5,
      created_at: new Date(),
      updated_by: 3,
      updated_at: new Date(),
    },
    {
      role_id: 4,
      permission_id: 2,
      created_at: new Date(),
      updated_by: 4,
      updated_at: new Date(),
    },
    {
      role_id: 4,
      permission_id: 3,
      created_at: new Date(),
      updated_by: 4,
      updated_at: new Date(),
    },
    {
      role_id: 5,
      permission_id: 4,
      created_at: new Date(),
      updated_by: 5,
      updated_at: new Date(),
    },
    {
      role_id: 5,
      permission_id: 5,
      created_at: new Date(),
      updated_by: 5,
      updated_at: new Date(),
    },
  ]);
}
