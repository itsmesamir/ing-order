import { Box, SimpleGrid } from '@chakra-ui/react';

import MenuItemCard from './MenuItemCard';

const menuItems = [
  {
    id: 1,
    name: 'Chicken Curry',
    price: '$152.10',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 4,
  },
  {
    id: 2,
    name: 'Chicken Skewer',
    price: '$250.50',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 3,
    name: 'Penne Pasta',
    price: '$300.10',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 4,
    name: 'Delicious Pizza',
    price: '$152.10',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 5,
    name: 'Chicken Steak',
    price: '$250.50',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 6,
    name: 'Chicken Wings',
    price: '$300.10',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 7,
    name: 'Big Hamburger',
    price: '$152.10',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 8,
    name: 'Meat Soup',
    price: '$250.50',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
  {
    id: 9,
    name: 'Fresh Sushi Roll',
    price: '$300.10',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    cafeName: 'Bakery Cafe',
    rating: 5,
  },
];

function MenuItemList() {
  return (
    <Box p="4">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="4">
        {menuItems.map((item, index) => (
          <MenuItemCard
            id={item.id}
            key={index}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            cafeName={item.cafeName}
            rating={item.rating}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MenuItemList;
