import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_group_memberships').del();

  await knex('user_group_memberships').insert([
    {
      membership_id: 1,
      user_id: 1,
      group_id: 1,
      created_by: 1,
    },
    {
      membership_id: 2,
      user_id: 2,
      group_id: 2,
      created_by: 1,
    },
    {
      membership_id: 3,
      user_id: 3,
      group_id: 3,
      created_by: 1,
    },
    {
      membership_id: 4,
      user_id: 4,
      group_id: 4,
      created_by: 1,
    },
    {
      membership_id: 5,
      user_id: 5,
      group_id: 5,
      created_by: 1,
    },
    {
      membership_id: 6,
      user_id: 6,
      group_id: 6,
      created_by: 1,
    },
    {
      membership_id: 7,
      user_id: 7,
      group_id: 7,
      created_by: 1,
    },
    {
      membership_id: 8,
      user_id: 2,
      group_id: 8,
      created_by: 1,
    },
    {
      membership_id: 9,
      user_id: 2,
      group_id: 9,
      created_by: 1,
    },
  ]);
}
