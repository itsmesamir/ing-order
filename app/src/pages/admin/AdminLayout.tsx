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
import { HiTemplate } from 'react-icons/hi';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut, BiCategory, BiUnite } from 'react-icons/bi';
import { FaCalendarMinus, FaComment, FaHistory, FaHome } from 'react-icons/fa';

import Header from 'pages/header';

import useUserStore from 'stores/useUserStore';

import NavItem from 'components/NavItem';
import Link from 'components/Link';

import { createRoute } from 'utils/route';
import history from 'utils/history';

import paths from 'constants/paths';

interface DrawerProps {
  onOpen: () => void;
  logOut: () => void;
}

const menuItems = [
  { name: 'Dashboard', icon: <FaHome />, path: paths.dashboard },
  {
    name: 'Menu',
    icon: <BiCategory />,
    subItems: [
      { name: 'Menu Item', path: paths.adminMenusLink, icon: <HiTemplate /> },
      { name: 'Menu Category', path: paths.categoriesLink, icon: <BiCategory /> },
      { name: 'Menu Units', path: paths.unitsLink, icon: <BiUnite /> },
    ],
  },
  { name: 'Order', icon: <FaHistory />, path: paths.orders },
  { name: 'Feedback', icon: <FaComment />, path: paths.feedbacks },
  { name: 'User Page', icon: <FaCalendarMinus />, path: paths.menus, isAdminRoute: false },
];

function AdminDrawerItems({ onOpen, logOut }: DrawerProps) {
  return (
    <Stack w="100%">
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Flex flexDir="column">
          <Link to={createRoute([paths.menus])}>
            <Heading size="md">Ing Order</Heading>
          </Link>
          <Text>Admin App</Text>
        </Flex>
      </Flex>

      <Accordion allowToggle>
        {menuItems.map(item => {
          const { subItems, name, path, isAdminRoute = true, icon } = item;

          if (subItems) {
            return (
              <AccordionItem>
                <AccordionButton>
                  <NavItem
                    icon={item.icon}
                    label={item.name}
                    link="#"
                    isLink={false}
                    classes={{ item: 'flex-1' }}
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

          const itemPaths = isAdminRoute ? [paths.admin, path] : [path];

          return (
            <>
              <NavItem key={name} icon={icon} label={name} link={createRoute(itemPaths)} />
              <Divider color="gray.300" />
            </>
          );
        })}
      </Accordion>

      <NavItem
        icon={<BiLogOut />}
        label="Log Out"
        link="#"
        onClick={() => {
          logOut();
          history.push('/login');
        }}
        as="button"
      />
      <Divider color="gray.300" />
    </Stack>
  );
}

function AdminDrawerContent({ onOpen, logOut }: DrawerProps) {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <AdminDrawerItems onOpen={onOpen} logOut={logOut} />
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
  const { data: user, logOut } = useUserStore(state => state);

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
            <AdminDrawerItems onOpen={onOpen} logOut={logOut} />
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
        <AdminDrawerContent onOpen={onOpen} logOut={logOut} />
      </Drawer>
    </Box>
  );
}

export default AdminLayout;
