import React, { Children, useState } from 'react';
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

import useCartStore from 'stores/useCartStore';

import MenuItemList from 'components/MenuItemList';
import InputField from 'components/InputField';
import Input from 'components/common/input';

import { useMenusQuery } from 'hooks/useMenusQuery';
import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';

import Order from './order/Order';
import Search from './search/Search';

type RightColumnProps = {
  children: React.ReactNode;
};

function RightColumn(props: RightColumnProps) {
  const { children } = props;

  const { data: menuItems, isLoading: isMenuItemLoading } = useMenusQuery({});

  const { data: menuCateogries, isLoading: isMenuCategoriesLoading } = useMenuCategoriesQuery({});

  const [searchItem, setSearchItem] = useState('');

  if (!menuItems || isMenuItemLoading) {
    return <>Loading...</>;
  }

  return <div className="flex flex-col flex-1">{children}</div>;
}

export default RightColumn;
