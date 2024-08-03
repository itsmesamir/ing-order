import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries
  await knex('menu_items').del();

  // Insert seed entries
  await knex('menu_items').insert([
    {
      cafe_id: 1,
      category_id: 1,
      name: 'Espresso',
      description: 'Rich and bold espresso coffee.',
      price: 3.5,
      max_order: 10,
      prepared_time: 5,
      availability: true,
      discount: 0.0,
      is_special: false,
      // attached a expresso image from other source than unsplash
      image_url:
        'https://e7.pngegg.com/pngimages/329/271/png-clipart-health-food-healthy-diet-meal-delivery-service-health-leaf-vegetable-food.png',
      status: 'Available',
      created_by: 1,
    },
    {
      cafe_id: 1,
      category_id: 1,
      name: 'Latte',
      description: 'Smooth and creamy latte with steamed milk.',
      price: 4.0,
      max_order: 15,
      prepared_time: 7,
      availability: true,
      discount: 0.1,
      is_special: false,
      image_url: 'https://source.unsplash.com/1600x900/?coffee',
      status: 'Available',
      created_by: 1,
    },
    {
      cafe_id: 2,
      category_id: 2,
      name: 'Chocolate Cake',
      description: 'Decadent chocolate cake with a rich frosting.',
      price: 5.0,
      max_order: 5,
      prepared_time: 10,
      availability: true,
      discount: 0.2,
      is_special: true,

      // chocolate cake image from other source than unsplash'
      image_url:
        'https://e7.pngegg.com/pngimages/329/271/png-clipart-health-food-healthy-diet-meal-delivery-service-health-leaf-vegetable-food.png',
      status: 'Available',
      created_by: 2,
    },
    {
      cafe_id: 2,
      category_id: 3,
      name: 'Caesar Salad',
      description: 'Fresh Caesar salad with crispy croutons.',
      price: 6.5,
      max_order: 20,
      prepared_time: 8,
      availability: true,
      discount: 0.0,
      is_special: false,
      image_url: 'https://source.unsplash.com/1600x900/?coffee',
      status: 'Available',
      created_by: 2,
    },
    {
      cafe_id: 3,
      category_id: 1,
      name: 'Cappuccino',
      description: 'Classic cappuccino with a rich foam layer.',
      price: 4.5,
      max_order: 12,
      prepared_time: 6,
      availability: true,
      discount: 0.05,
      is_special: false,
      image_url: 'https://source.unsplash.com/1600x900/?coffee',
      status: 'Available',
      created_by: 3,
    },
    {
      cafe_id: 3,
      category_id: 2,
      name: 'Muffin',
      description: 'Freshly baked muffin with a crumbly top.',
      price: 2.5,
      max_order: 8,
      prepared_time: 4,
      availability: true,
      discount: 0.0,
      is_special: false,
      image_url: 'https://source.unsplash.com/1600x900/?coffee',
      status: 'Available',
      created_by: 3,
    },
  ]);
}
