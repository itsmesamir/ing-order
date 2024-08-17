import { Box, Text, Spinner, Container } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';

import useUserStore from 'stores/useUserStore';

import DashboardLayout from 'components/DashboardLayout';
import Table from 'components/table/Table';

import { useLeaveCreditsQuery } from 'hooks/useLeaveCreditsQuery';
import { useLeaveTypesQuery } from 'hooks/useLeaveTypesQuery';

import { LeaveCredit } from 'types/common';

export default function LeaveBalance() {
  const { data: currentUser } = useUserStore();
  const leavesQuery = useLeaveCreditsQuery({ userId: currentUser?.id });
  const leaveTypesQuery = useLeaveTypesQuery({});

  const {
    isLoading: isLoadingLeaveCredits,
    isSuccess: isSuccessLeaveCredits,
    data: leaveCredits = [],
  } = leavesQuery;

  const {
    isLoading: isLoadingLeaveTypes,
    isSuccess: isSuccessLeaveTypes,
    data: leaveTypes = [],
  } = leaveTypesQuery;

  const combinedData = leaveTypes.map(leaveType => {
    const leaveCredit = leaveCredits.find(credit => credit.leaveTypeId === leaveType.id);

    return {
      ...leaveCredit,
      leaveType,
      leave: leaveCredit?.leaveDays || 0,
      available: leaveCredit?.takenDays || 0,
    };
  });

  const leaveColumns: Array<ColumnDef<Partial<LeaveCredit>>> = [
    {
      header: 'SN',
      cell: ({ row: { index } }: { row: { index: number } }) => index + 1,
      size: 40,
    },
    {
      header: 'Leave',
      accessorKey: 'leave',
      size: 240,
      cell: ({ row }) => row.original.leaveType?.name || 'N/A',
    },
    {
      header: 'Credits',
      accessorKey: 'leaveDays',
      size: 100,
      cell: ({ row }) => row.original.leaveDays || 0,
    },
    {
      header: 'Taken',
      accessorKey: 'takenDays',
      size: 100,
      cell: ({ row }) => row.original.takenDays || 0,
    },
    {
      header: 'Available',
      accessorKey: 'available',
      size: 100,
      cell: ({ row }) => {
        const { leaveDays, takenDays } = row.original;

        return (leaveDays || 0) - (takenDays || 0);
      },
    },
  ];

  if (isLoadingLeaveCredits || isLoadingLeaveTypes) {
    return (
      <DashboardLayout bgColor="white">
        <Box pt={2} textAlign="center">
          <Spinner size="lg" color="gray.400" />
        </Box>
      </DashboardLayout>
    );
  }

  if (!isSuccessLeaveCredits || !isSuccessLeaveTypes) {
    return (
      <DashboardLayout bgColor="white">
        <Box pt={2} textAlign="center">
          <Text fontSize="lg" color="red.500">
            Failed to fetch leave data.
          </Text>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout bgColor="white">
      <Box pt={2}>
        <Container maxW="6xl">
          <Text fontSize="2xl" fontWeight="bold" color="gray.10" mb={5} mt={5}>
            Leave Balance
          </Text>
          <Table
            loading={false}
            columns={leaveColumns}
            data={combinedData}
            emptyMessage="No leave data available."
          />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
