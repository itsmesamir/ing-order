import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('groups').del();

  // Insert seed entries
  await knex('groups').insert([
    {
      name: 'Admin Group',
      description: 'Group for administrators with full access.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 1,
      updated_by: 1,
    },
    {
      name: 'Staff Group',
      description: 'Group for staff members with limited access.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 2,
      updated_by: 2,
    },
    {
      name: 'Guest Group',
      description: 'Group for guests with minimal access.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 3,
      updated_by: 3,
    },
    {
      name: 'VIP Group',
      description: 'Group for VIP users with special privileges.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 4,
      updated_by: 4,
    },
    {
      name: 'Support Group',
      description: 'Group for customer support staff.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 5,
      updated_by: 5,
    },
    {
      name: 'Development Group',
      description: 'Group for development team members.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 6,
      updated_by: 6,
    },
    {
      name: 'Marketing Group',
      description: 'Group for marketing team members.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 7,
      updated_by: 7,
    },
    {
      name: 'Finance Group',
      description: 'Group for finance team members.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 8,
      updated_by: 8,
    },
    {
      name: 'HR Group',
      description: 'Group for human resources team members.',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 1,
      updated_by: 1,
    },
  ]);
}
