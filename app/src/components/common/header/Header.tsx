import { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  MenuDivider,
  Badge,
  Avatar,
} from '@chakra-ui/react';
import { MdSettings, MdShoppingCart } from 'react-icons/md';

import useCartStore from 'stores/useCartStore';

import Search from 'components/search/Search';
import Link from 'components/Link';
import MenuItemList from 'components/MenuItemList';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { createRoute } from 'utils/route';

import { User } from 'types/User';
import { MenuItem } from 'types/common';

import paths from 'constants/paths';

type HeaderProps = {
  currentUser: User | null;
};

function Header(props: HeaderProps) {
  const { currentUser } = props;
  const { summary } = useCartStore();
  const [searchItem, setSearchItem] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

  const { data, isLoading } = useMenusQuery({});

  const handleFilterClick = () => {
    if (data) {
      const categories = Array.from(
        new Set(data.data.filter(item => item.category).map(item => item.category!.name))
      );
      setUniqueCategories(categories);
    }
  };

  const handleCategorySelect = (category: string) => {
    setFilter(category);
    const filtered = data?.data.filter(item => item.category?.name === category);
    setFilteredMenuItems(filtered || []);
  };

  const resetFilter = () => {
    setFilter(null);
    setFilteredMenuItems(data?.data || []);
  };

  useEffect(() => {
    if (!filter) {
      setFilteredMenuItems(data?.data || []);
    }
  }, [filter, data]);

  return (
    <nav className="flex-1 flex justify-between max-h-16 h-16 items-center sticky top-0 z-50 bg-white px-4">
      <div className="flex items-center gap-x-5">
        <Search searchItem={searchItem} setSearchItem={setSearchItem} />
        <Menu>
          <MenuButton as={Button} colorScheme="orange" onClick={handleFilterClick}>
            <MdSettings size={16} className="mr-2" /> Filter
          </MenuButton>
          <MenuList>
            {isLoading ? (
              <ChakraMenuItem>Loading categories...</ChakraMenuItem>
            ) : (
              <>
                {uniqueCategories.length === 0 ? (
                  <ChakraMenuItem>No categories available</ChakraMenuItem>
                ) : (
                  uniqueCategories.map(category => (
                    <ChakraMenuItem key={category} onClick={() => handleCategorySelect(category)}>
                      {category}
                    </ChakraMenuItem>
                  ))
                )}
                <MenuDivider />
                <ChakraMenuItem onClick={resetFilter}>Reset Filters</ChakraMenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </div>
      <div className="flex items-center gap-x-4">
        <Link to={createRoute([paths.checkout])}>
          <div className="relative">
            <MdShoppingCart size={24} />
            <Badge
              display="flex"
              alignItems="center"
              justifyContent="center"
              rounded={{ base: 'full' }}
              variant="solid"
              bgColor="orange.500"
              width="20px"
              height="20px"
              fontSize="12px"
              fontWeight="medium"
              textAlign="center"
              className="absolute -top-2 -right-2"
            >
              {summary.quantity}
            </Badge>
          </div>
        </Link>
        <div className="flex items-center gap-x-2 rounded-lg bg-grey-200 h-11 px-4">
          <Avatar height="32px" width="32px" name="Dan Abrahmov" src={currentUser?.imageUrl} />
          <p>{currentUser?.name}</p>
        </div>
      </div>
    </nav>
  );
}

export default Header;
