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
import {
  FaBars,
  FaCog,
  FaComment,
  FaHeart,
  FaHistory,
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaStar,
} from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', icon: FaHome },
  { name: 'Explore', icon: FaSearch },
  { name: 'Favourite', icon: FaHeart },
  { name: 'Order', icon: FaShoppingCart },
  { name: 'Order History', icon: FaHistory },
  { name: 'Messages', icon: FaComment },
  { name: 'Reviews', icon: FaStar },
  { name: 'Settings', icon: FaCog },
];

function DashboardDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = (name: string) => {
    setActiveItem(name);
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
          onClick={() => handleMenuItemClick(item.name)}
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
