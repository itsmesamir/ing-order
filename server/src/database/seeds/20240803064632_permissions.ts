import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('permissions').del(); // Clear existing data

  await knex('permissions').insert([
    {
      name: 'View Dashboard',
      description: 'Allows viewing of the dashboard.',
      created_by: 1,
      created_at: new Date(),
    },
    {
      name: 'Manage Menu Items',
      description: 'Allows adding, editing, and removing menu items.',
      created_by: 1,
      created_at: new Date(),
    },
    {
      name: 'Manage Orders',
      description: 'Allows viewing and updating orders.',
      created_by: 1,
      created_at: new Date(),
    },
    {
      name: 'Manage Users',
      description: 'Allows management of users.',
      created_by: 1,
      created_at: new Date(),
    },
    {
      name: 'Generate Reports',
      description: 'Allows generating reports.',
      created_by: 1,
      created_at: new Date(),
    },
    {
      name: 'Configure Settings',
      description: 'Allows configuration of system settings.',
      created_by: 1,
      created_at: new Date(),
    },
  ]);
}
