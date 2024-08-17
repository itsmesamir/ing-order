import { Box, Container, Text, Flex, Icon, Button } from '@chakra-ui/react';
import { MdTrendingUp, MdEventAvailable, MdPerson, MdHourglassEmpty } from 'react-icons/md';

import LeaveTable from 'pages/leave/LeaveTable';

import DashboardLayout from 'components/DashboardLayout';

import { useUsersQuery } from 'hooks/useUsersQuery';

interface LeaveTableActionsProps {
  id: number;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

function DashboardBox({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <Box width="35vw" borderWidth="1px" borderRadius="lg" p="4" m="4" boxShadow="none" bg="white">
      {children}
    </Box>
  );
}

function Dashboard() {
  const usersQuery = useUsersQuery({});
  const { isLoading: isLoadingUsers, isSuccess: isSuccessUsers, data: users = [] } = usersQuery;

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl">
        <Flex flexDirection="column" alignItems="center">
          <Flex>
            <DashboardBox>
              <Flex alignItems="center" mb="2">
                <Icon as={MdEventAvailable} fontSize="2xl" color="blue.500" mr="2" />
                <Text fontSize="xl">Leave Summary</Text>
              </Flex>
              <Box>Display leave trends data here</Box>
            </DashboardBox>
            <DashboardBox>
              <Flex alignItems="center" mb="2">
                <Icon as={MdTrendingUp} fontSize="2xl" color="green.500" mr="2" />
                <Text fontSize="xl">Leave Trends</Text>
              </Flex>
              <Box>Display leave trends data here</Box>
            </DashboardBox>
          </Flex>
          <Flex>
            <DashboardBox>
              <Flex alignItems="center" mb="2">
                <Icon as={MdPerson} fontSize="2xl" color="orange.500" mr="2" />
                <Text fontSize="xl">Employee Attendance</Text>
              </Flex>
              <Box>Display leave trends data here</Box>
            </DashboardBox>
            <DashboardBox>
              <Flex alignItems="center" mb="2">
                <Icon as={MdHourglassEmpty} fontSize="2xl" color="purple.500" mr="2" />
                <Text fontSize="xl">Leave Balances</Text>
              </Flex>
              <Box>Display leave trends data here</Box>
            </DashboardBox>
          </Flex>
        </Flex>

        <LeaveTable />
      </Container>
    </DashboardLayout>
  );
}

export default Dashboard;
