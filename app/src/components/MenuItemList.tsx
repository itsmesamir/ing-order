import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Menu,
  Button,
  MenuList,
  SimpleGrid,
  MenuButton,
  MenuDivider,
  MenuItem as ChakraMenuItem,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';

import useCartStore from 'stores/useCartStore';

import { MenuItem } from 'types/common';

import MenuItemCard from './MenuItemCard';

function MenuItemList({ menuItems }: { menuItems: MenuItem[] }) {
  const { addItem } = useCartStore();

  const [filter, setFilter] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>(menuItems);

  useEffect(() => {
    const categories = Array.from(
      new Set(menuItems.filter(item => item.category).map(item => item.category!.name))
    );
    setUniqueCategories(categories);
  }, [menuItems]);

  useEffect(() => {
    if (!filter) {
      setFilteredMenuItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category?.name === filter);
      setFilteredMenuItems(filtered);
    }
  }, [filter, menuItems]);

  const resetFilter = () => setFilter(null);

  return (
    <Box p="4">
      <Flex justifyContent="flex-end" mb="4">
        <Menu placement="bottom-end">
          <MenuButton as={Button} colorScheme="orange">
            <span className="flex items-center">
              <MdSettings size={16} className="mr-2" /> Filter
            </span>
          </MenuButton>
          <MenuList>
            {uniqueCategories.length === 0 ? (
              <ChakraMenuItem>No categories available</ChakraMenuItem>
            ) : (
              uniqueCategories.map(category => (
                <ChakraMenuItem key={category} onClick={() => setFilter(category)}>
                  {category}
                </ChakraMenuItem>
              ))
            )}
            <MenuDivider />
            <ChakraMenuItem onClick={resetFilter}>Reset Filters</ChakraMenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="6">
        {filteredMenuItems.map(item => (
          <MenuItemCard key={item.id} item={item} addItem={addItem} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default MenuItemList;
