import React, { useState } from 'react';

import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';
import { useMenusQuery } from 'hooks/useMenusQuery';

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
