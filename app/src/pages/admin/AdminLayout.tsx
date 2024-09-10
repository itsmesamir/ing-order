import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Drawer, DrawerContent, DrawerOverlay, DrawerCloseButton } from '@chakra-ui/modal';
import {
  IconButton,
  Box,
  Grid,
  Flex,
  Heading,
  Text,
  Stack,
  Divider,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  AccordionItem,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { FaComment, FaHistory, FaHome, FaSearch } from 'react-icons/fa';

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
  return (
    <Stack w="100%">
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Flex flexDir="column">
          <Heading size="md">Ing Order</Heading>
          <Text>Admin App</Text>
        </Flex>
      </Flex>

      <Accordion allowToggle>
        {menuItems.map(item => {
          if (item.subItems) {
            return (
              <AccordionItem>
                <AccordionButton>
                  {/* <Box as="span" flex="1" textAlign="left">
                    Menu
                  </Box> */}
                  <NavItem
                    icon={item.icon}
                    label={item.name}
                    link="#"
                    classes={{ link: 'w-full' }}
                  />
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {item.subItems.map(subItem => (
                    <NavItem
                      key={subItem.name}
                      icon={subItem.icon}
                      label={subItem.name}
                      link={createRoute([paths.admin, subItem.path])}
                    />
                  ))}
                </AccordionPanel>
              </AccordionItem>
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
      </Accordion>

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
