import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Flex } from '@chakra-ui/layout';
import {
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Select,
  Box,
  Text,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { fetchOrders } from 'services/oders';

import Link from 'components/Link';
import Table from 'components/table/Table';
import Loading from 'components/common/Loading';
import ActionModal from 'components/common/actionModal';

import { getFormattedDate } from 'utils/date';

import { Any, CellData, MenuItem, Order, OrderStatusEnum, RowData } from 'types/common';

import paths from 'constants/paths';
import queryKey from 'constants/queryKey';
import { MMMM_DD_YYYY_H_MM_A } from 'constants/date';

const statusTypes = [
  { id: '', name: 'Any' },
  { id: 'Pending', name: 'Pending' },
  { id: 'Completed', name: 'Completed' },
  { id: 'Failed', name: 'Failed' },
];

function StatusButton({ status }: { status: OrderStatusEnum }) {
  return <Button w={40}>{status}</Button>;
}

function ActionCell(
  { row: { original } }: { row: { original: RowData<Order> } },
  ActionOption: (requestData: RowData<Order>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

function AdminOrders() {
  const [filter, setFilter] = useState(statusTypes[0].id);

  const { data: orders, isLoading } = useQuery({
    queryKey: [queryKey.orders, filter],
    queryFn: ({ signal }: Any) => fetchOrders(filter ? { status: filter } : {}, signal),
    enabled: true,
  });

  const defaultImageUrl =
    'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg';

  const isOrderLoading = !orders || isLoading;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const ActionOption = () =>
    useMemo(
      () => [
        {
          name: 'Edit',
          icon: <FiEdit />,
          state: (rowData: Order) => {
            console.log(rowData);
          },
        },

        {
          name: 'Delete',
          className: 'text-red-500',
          icon: <FiTrash />,
          state: (rowData: Order) => {
            console.log(rowData);
          },
          // state: (rowData: Order) => setDeleteModalOpenFor(rowData?.id),
        },
      ],
      []
    );

  const getOrderColumns = (): Array<ColumnDef<Order>> => {
    return [
      {
        header: 'SN',
        cell: ({ row: { index } }: { row: { index: number } }) => index + 1,
        size: 40,
      },
      {
        header: 'Order ID',
        cell: ({ row }) => row.original.id,
        size: 40,
      },
      {
        header: "Employee's Name",
        accessorKey: 'userName',
        cell: ({ row }) => row.original.name,
        size: 240,
        enableSorting: true,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        size: 100,
      },
      {
        header: 'Order Date',
        accessorKey: 'orderCreatedAt',
        size: 100,
        cell: ({ row }) => getFormattedDate(row.original.createdAt),
      },
      {
        header: 'Total Amount',
        accessorKey: 'totalPrice',
        size: 100,
      },
      {
        header: 'Cafe Name',
        accessorKey: 'cafeName',
        size: 100,
        // cell: ({ row }) => row.original.cafe.name,
      },
      {
        header: 'College Name',
        accessorKey: 'collegeName',
        size: 100,
        // cell: ({ row }) => row.original.cafe.name,
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }: { row: Any }) => ActionCell({ row }, ActionOption as () => CellData[]),
        size: 160,
      },
    ];
  };

  // if order empty show skeleton

  if (isOrderLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color="gray.10">
        Orders
      </Text>
      <Table
        loading={false}
        columns={getOrderColumns()}
        data={orders || []}
        emptyMessage="No leave data available."
      />
    </>
  );
}

export default AdminOrders;
