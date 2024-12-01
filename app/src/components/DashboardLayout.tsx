import { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Drawer, DrawerContent, DrawerOverlay, DrawerCloseButton } from '@chakra-ui/modal';
import { Divider, Stack, Box, Grid, Flex, Heading, Text } from '@chakra-ui/layout';
import {
  FaHome,
  FaSearch,
  FaComment,
  FaHistory,
  FaCheckDouble,
  FaCalendarMinus,
} from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

import useUserStore from 'stores/useUserStore';

import { createRoute } from 'utils/route';
import history from 'utils/history';

import { Any, Roles } from 'types/common';

import paths from 'constants/paths';

import NavItem from './NavItem';
import Header from './common/header/Header';

function getMenuItems({ isAdmin = false }: { isAdmin?: boolean }) {
  return [
    { name: 'Dashboard', icon: <FaHome />, path: paths.dashboard },
    { name: 'Menu', icon: <FaSearch />, path: createRoute([paths.menus, paths.list]) },
    { name: 'Order History', icon: <FaHistory />, path: createRoute([paths.user, paths.orders]) },
    { name: 'Feedback', icon: <FaComment />, path: paths.feedbacks },
    { name: 'Checkout', icon: <FaCheckDouble />, path: createRoute([paths.checkout]) },
    ...(isAdmin
      ? [
          {
            name: 'Admin Page',
            icon: <FaCalendarMinus />,
            path: createRoute([paths.admin]),
          },
        ]
      : []),
  ];
}

interface DrawerItemsProps {
  isAdmin?: boolean;
  onOpen: () => void;
  logOut: () => Any;
}

function DashboardDrawerItems({ isAdmin, onOpen, logOut }: DrawerItemsProps) {
  const menuItems = getMenuItems({ isAdmin });

  return (
    <Stack w="100%">
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Flex flexDir="column">
          <Heading size="md">Ing Order</Heading>
          <Text>Food App</Text>
        </Flex>
      </Flex>

      {menuItems.map(item => (
        <NavItem key={item.name} icon={item.icon} label={item.name} link={item.path} />
      ))}

      <Divider color="gray.300" />
      <NavItem
        icon={<BiLogOut />}
        onClick={() => {
          logOut();
          history.push('/login');
        }}
        label="Log Out"
        link="/#"
      />
      <Divider color="gray.300" />
    </Stack>
  );
}

function DashboardDrawerContent({ onOpen, isAdmin, logOut }: DrawerItemsProps) {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DashboardDrawerItems onOpen={onOpen} isAdmin={isAdmin} logOut={logOut} />
    </DrawerContent>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

function DashboardLayout({ children, bgColor }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data: user, logOut } = useUserStore(state => state);

  const isAdmin = user?.roles.some(role => role?.name === Roles.ADMIN);

  const width = isSidebarOpen ? 300 : 0;

  return (
    <Box>
      <Box>
        <Box bg={bgColor || 'gray.100'} minHeight="calc(100vh - 64px)">
          <Grid
            templateColumns={[
              'minmax(0px, auto)',
              'minmax(0px, auto)',
              `${width}px minmax(0px, 2fr)`,
              `${width}px minmax(0px, 3fr)`,
              `${width}px minmax(0px, 4fr)`,
            ]}
            autoRows="minmax(min-content, max-content)"
            position="relative"
            transition="200ms"
            overflow="hidden"
          >
            <Box
              display={['none', 'none', 'flex']}
              bg="white"
              height="100vh"
              maxWidth="100%"
              top={0}
              overflow="hidden"
            >
              <DashboardDrawerItems onOpen={onOpen} isAdmin={isAdmin} logOut={logOut} />
            </Box>
            <Box maxH="100vh" overflowY="scroll">
              <Flex bg="white" justifyContent="space-between" height="95px" alignItems="center">
                <IconButton
                  bg="white"
                  display={['auto', 'auto', 'none']}
                  aria-label="Main Drawer"
                  onClick={onOpen}
                  icon={<AiOutlineMenu />}
                />

                <div className="center">
                  <IconButton
                    bg="white"
                    display={['none', 'none', 'flex']}
                    aria-label="Main Drawer"
                    onClick={() => {
                      setIsSidebarOpen(open => !open);
                    }}
                    icon={<AiOutlineMenu />}
                  />
                </div>

                <Header currentUser={user} />
              </Flex>
              {children}
            </Box>
          </Grid>
        </Box>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DashboardDrawerContent onOpen={onOpen} logOut={logOut} />
        </Drawer>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
