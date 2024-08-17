import { Button, IconButton } from '@chakra-ui/button';
import { Box, Container, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

import useUserStore from 'stores/useUserStore';

import { createRoute } from 'utils/route';

import { Roles } from 'types/common';

import paths from 'constants/paths';
import { ColorModeSwitcher } from 'ColorModeSwitcher';

import Link from './Link';

type NavbarProps = {
  onOpen: () => void;
};

function Navbar({ onOpen }: NavbarProps) {
  const { data: user, removeUser } = useUserStore();

  const userRoles = user?.roles.map(role => role.name) || [];

  const hasRoles = (roles: string[]) => roles.some(role => userRoles.includes(role));

  return (
    <Box borderBottom="1px solid " borderColor="gray.200" py={3}>
      <Container maxW="container.2xl">
        <Flex justify="space-between" align="center" width="100%">
          <Flex
            justify={['space-between', 'space-between', 'flex-start']}
            width={['100%', '100%', 'fit-content']}
          >
            <Flex alignItems="center">
              <IconButton
                aria-label="Main Drawer"
                onClick={onOpen}
                icon={<AiOutlineMenu />}
                display={['inherit', 'inherit', 'none', 'none']}
              />
              <Link to={paths.home}>
                <Heading ml={2} as="h6" fontSize="2xl">
                  Leave
                </Heading>
              </Link>
            </Flex>
            <Box>
              <Button
                ml="4"
                onClick={e => {
                  e.preventDefault();
                  removeUser();
                }}
              >
                Log Out
              </Button>
              <ColorModeSwitcher justifySelf="flex-end" />
            </Box>
          </Flex>
          <Flex align="center">
            <Flex display={['none', 'none', 'block']}>
              {hasRoles([Roles.ADMIN]) && (
                <Link to={createRoute([paths.employee])} ml={4}>
                  Employee
                </Link>
              )}
              <Link to={createRoute([paths.leave])} ml={4}>
                Leave
              </Link>
              <Link to={createRoute([paths.leave, paths.balance])} ml={4}>
                Leave Balance
              </Link>
              <Link to={createRoute([paths.leave, paths.apply])} ml={4}>
                Apply Leave
              </Link>
            </Flex>
            <Spacer />
            <Link to={createRoute([paths.profile])}>
              <Box margin="0 1rem">
                <FaUserCircle fontSize="1.5em" color="gray.100" />
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
