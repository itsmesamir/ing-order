import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Divider, Stack } from '@chakra-ui/layout';
import { AiOutlineHome } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import Navbar from './Navbar';
import NavItem from './NavItem';
import Link from './Link';

type DashboardLayoutData = {
  children: JSX.Element[] | JSX.Element;
  bgColor: string;
};

function MainDrawerContent() {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        <Link to={paths.home}>Leave Management</Link>
      </DrawerHeader>

      <Stack>
        <NavItem icon={<AiOutlineHome />} label="Leave" link={paths.leave} />
        <NavItem
          icon={<CgMenuGridO />}
          label="Apply Leave"
          link={createRoute([paths.leave, paths.apply])}
        />
        <Divider color="gray.400" />
        <NavItem icon={<BiLogOut />} label="Log Out" link="#" />
        <Divider color="gray.400" />
      </Stack>
      <DrawerFooter />
    </DrawerContent>
  );
}

function DashboardLayout({ children, bgColor }: DashboardLayoutData) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Navbar onOpen={onOpen} />
      <Box bg="gray.100" minHeight="calc(100vh - 80px)">
        {children}
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <MainDrawerContent />
      </Drawer>
    </Box>
  );
}

export default DashboardLayout;
