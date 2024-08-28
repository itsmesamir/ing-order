import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Drawer, DrawerContent, DrawerOverlay, DrawerCloseButton } from '@chakra-ui/modal';
import { IconButton, Box, Grid, Flex, Heading, Text, Stack, Divider } from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { FaComment, FaHistory, FaHome, FaSearch } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons'; // Import the ChevronDownIcon
import { Link as RouterLink } from 'react-router-dom';

import Header from 'pages/header';

import useUserStore from 'stores/useUserStore';

import NavItem from 'components/NavItem';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

interface DashboardProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

interface DrawerProps {
  onOpen: () => void;
}

const menuItems = [
  { name: 'Dashboard', icon: <FaHome />, path: paths.dashboard },
  {
    name: 'Menu',
    icon: <FaSearch />,
    subItems: [
      { name: 'Menu Item', path: paths.adminMenusLink, icon: <FaSearch /> },
      { name: 'Menu Category', path: paths.categoriesLink, icon: <FaSearch /> },
      { name: 'Menu Units', path: paths.unitsLink, icon: <FaSearch /> },
    ],
  },
  { name: 'Order', icon: <FaHistory />, path: paths.orders },
  { name: 'Feedback', icon: <FaComment />, path: paths.feedbacks },
];

function AdminDrawerItems({ onOpen }: DrawerProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleSubItems = (itemName: string) => {
    setActiveItem(prev => (prev === itemName ? null : itemName));
  };

  return (
    <Stack w="100%">
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Flex flexDir="column">
          <Heading size="md">Ing Order</Heading>
          <Text>Admin App</Text>
        </Flex>
      </Flex>

      {menuItems.map(item => {
        if (item.subItems) {
          return (
            <Box key={item.name} position="relative">
              <Flex alignItems="center" onClick={() => toggleSubItems(item.name)} cursor="pointer">
                <NavItem icon={item.icon} label={item.name} link="#" />
                <ChevronDownIcon
                  ml="auto"
                  transform={activeItem === item.name ? 'rotate(180deg)' : 'rotate(0)'}
                  transition="transform 0.2s ease"
                />
              </Flex>
              {activeItem === item.name && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  zIndex={1}
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  overflow="hidden"
                  mt={1}
                >
                  {item.subItems.map(subItem => (
                    <NavItem
                      key={subItem.name}
                      icon={subItem.icon}
                      label={subItem.name}
                      link={createRoute([paths.admin, subItem.path])}
                    />
                  ))}
                </Box>
              )}
            </Box>
          );
        }
        return (
          <NavItem
            key={item.name}
            icon={item.icon}
            label={item.name}
            link={createRoute([paths.admin, item.path])}
          />
        );
      })}

      <Divider color="gray.300" />
      <NavItem icon={<BiLogOut />} label="Log Out" link="/#" />
      <Divider color="gray.300" />
    </Stack>
  );
}

function AdminDrawerContent({ onOpen }: DrawerProps) {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <AdminDrawerItems onOpen={onOpen} />
    </DrawerContent>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

function AdminLayout({ children, bgColor }: AdminLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useUserStore(state => state.data);
  const width = isSidebarOpen ? 300 : 0;

  return (
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
            <AdminDrawerItems onOpen={onOpen} />
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
        <AdminDrawerContent onOpen={onOpen} />
      </Drawer>
    </Box>
  );
}

export default AdminLayout;
