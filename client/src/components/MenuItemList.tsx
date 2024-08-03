import { Box, SimpleGrid } from '@chakra-ui/react';

import { MenuItem } from 'types/common';

import MenuItemCard from './MenuItemCard';

function MenuItemList({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <Box p="4">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="16">
        {menuItems.map((item, index) => (
          <MenuItemCard
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            // TODO: susmita
            imageUrl="kk"
            cafeName=""
            rating={5}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MenuItemList;
