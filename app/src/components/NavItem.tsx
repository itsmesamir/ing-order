import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { useLocation } from 'react-router-dom';

import { Any } from 'types/common';

import Link from './Link';

type NavItemData = {
  icon: Any;
  label: string;
  link: string;
  classes?: {
    link?: string;
    item?: string;
  };
  onClick?: () => void;
  as?: string;
  isLink?: boolean;
};

function NavItem({ icon, label, link, classes, onClick, as, isLink = true }: NavItemData) {
  const location = useLocation();
  const isActive = location.pathname === link;

  const innerItem = (
    <Flex align="center" as={!isLink ? 'span' : 'div'} className={classes?.item}>
      {React.cloneElement(icon, { size: '24px' })}
      <Box ml={3} fontWeight="500">
        {label}
      </Box>
    </Flex>
  );

  if (!isLink) {
    return innerItem;
  }

  return (
    <Link
      as={as}
      to={link}
      onClick={onClick}
      display="flex"
      alignItems="center"
      py={2}
      pr={2}
      pl={4}
      mt={0}
      bg={isActive ? 'orange.100' : 'transparent'}
      color={isActive ? 'orange.500' : 'inherit'}
      _hover={{
        backgroundColor: 'gray.100',
      }}
      className={classes?.link}
    >
      {innerItem}
    </Link>
  );
}

export default NavItem;
