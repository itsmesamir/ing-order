import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_groups').del();

  await knex('user_groups').insert([
    { id: 1, group_name: 'Admin Group', description: 'Group for admin users', is_active: true },
    { id: 2, group_name: 'Staff Group', description: 'Group for staff members', is_active: true },
    { id: 3, group_name: 'Student Group', description: 'Group for students', is_active: true },
    { id: 4, group_name: 'Guest Group', description: 'Group for guest users', is_active: true },
    {
      id: 5,
      group_name: 'Faculty Group',
      description: 'Group for faculty members',
      is_active: true,
    },
    { id: 6, group_name: 'Alumni Group', description: 'Group for alumni', is_active: true },
    {
      id: 7,
      group_name: 'Technical Group',
      description: 'Group for technical staff',
      is_active: true,
    },
    {
      id: 8,
      group_name: 'Administrative Group',
      description: 'Group for administrative staff',
      is_active: true,
    },
    { id: 9, group_name: 'Support Group', description: 'Group for support staff', is_active: true },
    {
      id: 10,
      group_name: 'Research Group',
      description: 'Group for research staff',
      is_active: true,
    },
  ]);
}
