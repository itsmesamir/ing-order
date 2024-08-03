import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('menu_categories').del();

  // Insert seed entries
  await knex('menu_categories').insert([
    {
      parent_id: null, // Top-level category
      category_name: 'Appetizers',
      created_by: 1,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    },
    {
      parent_id: null, // Top-level category
      category_name: 'Main Courses',
      created_by: 1,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    },
    {
      parent_id: 1, // Sub-category under Appetizers
      category_name: 'Starters',
      created_by: 2,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    },
    {
      parent_id: 1, // Sub-category under Appetizers
      category_name: 'Salads',
      created_by: 2,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    },
    {
      parent_id: 2, // Sub-category under Main Courses
      category_name: 'Pasta',
      created_by: 3,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    },
    {
      parent_id: 2, // Sub-category under Main Courses
      category_name: 'Grilled Meat',
      created_by: 3,
      created_at: new Date(),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null,
    },
  ]);
}
