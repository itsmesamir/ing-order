import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { MdSettings } from 'react-icons/md';

import MenuItemList from 'components/MenuItemList';
import InputField from 'components/InputField';
import Input from 'components/common/input';

import { useMenusQuery } from 'hooks/useMenusQuery';

import Order from './order/Order';

function RightColumn() {
  const { data: menuItems, isLoading } = useMenusQuery({});

  const [searchItem, setSearchItem] = useState('');

  if (!menuItems || isLoading) {
    return 'Loading...';
  }

  return (
    <div className="flex flex-col flex-1">
      <nav className="flex justify-between max-h-16 h-16  items-center px-6 sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-x-5">
          <div className="px-4 py-2 flex bg-gray-100 items-center gap-x-2 rounded-lg">
            <FiSearch className="" size={16} />
            <Input
              name="searchItem"
              value={searchItem}
              label=""
              placeholder=""
              onChange={e => setSearchItem(e.target.value)}
              className="border-none bg-gray-100 "
            />
          </div>

          <Button colorScheme="orange">
            <MdSettings size={16} className="mr-2" /> Filter
          </Button>
        </div>

        <div className="flex">
          <div>location</div>
          <div>notification</div>
          <div>profile</div>
        </div>
      </nav>

      {/* body */}
      <div className="flex bg-gray-100 pt-6">
        <div className="flex flex-wrap gap-12 flex-1  justify-center px-6">
          <MenuItemList menuItems={menuItems} />
        </div>

        {/* Order */}
        <div className="sticky top-[64px] right-0 w-80 pr-6 h-[70vh]">
          <Order />
        </div>
      </div>
    </div>
  );
}

export default RightColumn;
