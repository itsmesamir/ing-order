import { Box, SimpleGrid } from '@chakra-ui/react';

import useCartStore from 'stores/useCartStore';

import { MenuItem } from 'types/common';

import MenuItemCard from './MenuItemCard';

function MenuItemList({ menuItems }: { menuItems: MenuItem[] }) {
  const { addItem } = useCartStore();

  return (
    <Box p="4">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="4">
        {menuItems.map(item => (
          <MenuItemCard key={item.id} item={item} addItem={addItem} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MenuItemList;
