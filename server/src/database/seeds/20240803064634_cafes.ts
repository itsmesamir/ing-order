import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('cafes').del();

  // Insert seed entries
  await knex('cafes').insert([
    {
      college_id: 1,
      name: 'Cafe One',
      location: 'Main Building',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Cafe Two',
      location: 'Library Wing',
      created_by: 2,
    },
    {
      college_id: 1,
      name: 'Cafe Three',
      location: 'Sports Complex',
      created_by: 3,
    },
    {
      college_id: 3,
      name: 'Cafe Four',
      location: 'Arts Building',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Cafe Five',
      location: 'Engineering Block',
      created_by: 2,
    },
    {
      college_id: 1,
      name: 'Cafe Six',
      location: 'Dormitory',
      created_by: 3,
    },
    {
      college_id: 3,
      name: 'Cafe Seven',
      location: 'Medical Center',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Cafe Eight',
      location: 'Library Basement',
      created_by: 2,
    },
    {
      college_id: 1,
      name: 'Cafe Nine',
      location: 'Physics Department',
      created_by: 3,
    },
    {
      college_id: 3,
      name: 'Cafe Ten',
      location: 'Computer Lab',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Cafe Eleven',
      location: 'Administration Block',
      created_by: 2,
    },
  ]);
}
