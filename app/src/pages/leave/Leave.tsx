import { Box, Container } from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

import LeaveTable from './LeaveTable';

function Leave() {
  return (
    <DashboardLayout bgColor="white">
      <Box pt={2}>
        <Container maxW="6xl">
          <LeaveTable />
        </Container>
      </Box>
    </DashboardLayout>
  );
}

export default Leave;
