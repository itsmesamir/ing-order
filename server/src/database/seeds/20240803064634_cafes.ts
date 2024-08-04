import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('cafes').del();

  // Insert seed entries
  await knex('cafes').insert([
    {
      college_id: 1,
      name: 'Brit Cafe',
      location: 'Main Building',
      image_url:
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Brooke Cagle Cafe',
      location: 'Library Wing',
      image_url:
        'https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 2,
    },
    {
      college_id: 1,
      name: 'Himalayan Cafe',
      location: 'Main Block, Islington',
      image_url:
        'https://images.unsplash.com/photo-1511081692775-05d0f180a065?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 3,
    },
    {
      college_id: 3,
      name: 'Readers Cafe',
      location: 'Library Block, 2nd Floor',
      image_url:
        'https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?q=80&w=2188&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Red Mug Cafe',
      location: 'Engineering Block',
      image_url:
        'https://images.unsplash.com/photo-1415226581130-91cb7f52f078?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 2,
    },
    {
      college_id: 1,
      name: 'Friends Cafe',
      location: 'Main Block, 1st Floor',
      image_url:
        'https://images.unsplash.com/photo-1468730533502-216da872eab2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 3,
    },
    {
      college_id: 3,
      name: 'The Tolpuddle Cafe',
      location: 'Nepal Block, Islington',
      image_url:
        'https://images.unsplash.com/photo-1516197227520-4d1c419f6ec6?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Kumari Cafe',
      location: 'Library Basement',
      image_url:
        'https://plus.unsplash.com/premium_photo-1663013668671-d453f319544f?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 2,
    },
    {
      college_id: 1,
      name: 'Cafe Nine',
      location: 'Main Block, Kavya',
      image_url:
        'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 3,
    },
    {
      college_id: 3,
      name: 'The Coffee House',
      location: 'London Block, Herrald',
      image_url:
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=3547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 1,
    },
    {
      college_id: 2,
      name: 'Chiya Ghar',
      location: 'Kumari Block',
      image_url:
        'https://plus.unsplash.com/premium_photo-1661761894768-3840ed396a14?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      created_by: 2,
    },
  ]);
}
