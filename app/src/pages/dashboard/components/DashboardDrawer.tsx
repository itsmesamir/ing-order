import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FaBars,
  FaComment,
  FaFirstOrder,
  FaHistory,
  FaHome,
  FaSearch,
  FaTools,
} from 'react-icons/fa';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

const menuItems = [
  { name: 'Dashboard', icon: FaHome, path: paths.dashboard },
  { name: 'Menu', icon: FaSearch, path: paths.menus },
  { name: 'Order History', icon: FaHistory, path: paths.orders },
  { name: 'Feedback', icon: FaComment, path: paths.feedbacks },
  { name: 'Admin Orders', icon: FaFirstOrder, path: paths.userRoles },
  { name: 'User Roles', icon: FaTools, path: paths.adminOrders },
];

function DashboardDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const btnRef = useRef<HTMLButtonElement>(null);
  const history = useHistory();

  const handleMenuItemClick = (name: string, path: string) => {
    setActiveItem(name);
    history.push(createRoute([path]));
    onClose();
  };

  const renderMenuItems = () => (
    <VStack spacing="4" align="stretch">
      {menuItems.map(item => (
        <Box
          key={item.name}
          display="flex"
          alignItems="center"
          px="4"
          py="2"
          rounded="md"
          bg={activeItem === item.name ? 'orange.100' : 'transparent'}
          color={activeItem === item.name ? 'orange.500' : 'inherit'}
          _hover={{ bg: 'gray.200' }}
          cursor="pointer"
          onClick={() => handleMenuItemClick(item.name, item.path)}
        >
          <Icon as={item.icon} w="6" h="6" />
          <Text ml="4" fontSize="md">
            {item.name}
          </Text>
        </Box>
      ))}
    </VStack>
  );

  return (
    <>
      <IconButton
        aria-label="Open menu"
        icon={<FaBars />}
        variant="outline"
        onClick={onOpen}
        top="4"
        left="4"
        zIndex="1000"
        color="red"
        ref={btnRef}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>{renderMenuItems()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DashboardDrawer;
