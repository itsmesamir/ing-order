import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('colleges').del();

  await knex('colleges').insert([
    { id: 1, name: 'Islington College', address: 'Kamalpokhari', created_by: 1 },
    { id: 2, name: 'Herrald College', address: 'Naxal', created_by: 1 },
    { id: 3, name: 'College C', address: '789 Oak St', created_by: 1 },
    { id: 4, name: 'College D', address: '101 Pine St', created_by: 1 },
    { id: 5, name: 'College E', address: '202 Maple St', created_by: 1 },
    { id: 6, name: 'College F', address: '303 Birch St', created_by: 1 },
    { id: 7, name: 'College G', address: '404 Cedar St', created_by: 1 },
    { id: 8, name: 'College H', address: '505 Spruce St', created_by: 1 },
    { id: 9, name: 'College I', address: '606 Fir St', created_by: 1 },
    { id: 10, name: 'College J', address: '707 Redwood St', created_by: 1 },
  ]);
}
