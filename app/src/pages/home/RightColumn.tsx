import React from 'react';

import { useMenusQuery } from 'hooks/useMenusQuery';

type RightColumnProps = {
  children: React.ReactNode;
};

function RightColumn(props: RightColumnProps) {
  const { children } = props;

  const { data: menuItems, isLoading: isMenuItemLoading } = useMenusQuery({});

  if (!menuItems || isMenuItemLoading) {
    return <>Loading...</>;
  }

  return <div className="flex flex-col flex-1">{children}</div>;
}

export default RightColumn;
