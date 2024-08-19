import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
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
import { ColumnDef, Row } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { fetchOrders } from 'services/oders';

import Link from 'components/Link';
import Table from 'components/table/Table';
import Loading from 'components/common/Loading';
import ActionModal from 'components/common/actionModal';
import ExpandButton from 'components/common/button/ExpandButton';
import { DivWrapper } from 'components/table/tableCells';
import Overlay from 'components/common/overlay';

import useOpen from 'hooks/useOpen';

import { getFormattedDate } from 'utils/date';

import { Any, CellData, MenuItem, Order, OrderStatusEnum, RowData } from 'types/common';

import paths from 'constants/paths';
import queryKey from 'constants/queryKey';
import { MMMM_DD_YYYY_H_MM_A } from 'constants/date';

import SubRowComponent from './SubRowComponent';

const statusTypes = [
  { id: '', name: 'Any' },
  { id: 'Pending', name: 'Pending' },
  { id: 'Completed', name: 'Completed' },
  { id: 'Failed', name: 'Failed' },
];

function StatusButton({ status }: { status: OrderStatusEnum }) {
  return <Button w={40}>{status}</Button>;
}

function OutSideComponent({ row }: { row: Any }) {
  const { getToggleExpandedHandler, getIsExpanded } = row;

  return (
    <button type="button" onClick={getToggleExpandedHandler()} style={{ cursor: 'pointer' }}>
      {getIsExpanded() ? <IoIosArrowDown /> : <IoIosArrowForward />}
    </button>
  );
}

function ActionCell(
  { row: { original } }: { row: { original: RowData<Order> } },
  ActionOption: (requestData: RowData<Order>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

const renderSubComponent = (props: Any) => {
  const { subRow, isLoading } = props;

  const { row } = subRow;

  return <SubRowComponent data={row.original} isLoading={isLoading} />;
};

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
        header: ' ',
        size: 40,
        cell: ({ row }) => {
          const expand = row.getCanExpand()
            ? ExpandButton({
                onExpand: () => {
                  row.getToggleExpandedHandler();
                },
                isExpanded: row.getIsExpanded(),
              })
            : '';

          return DivWrapper({
            items: [expand],
            className: 'flex items-center',
          });
        },
      },
      // {
      //   header: 'Order ID',
      //   cell: ({ row }) => row.original.id,
      //   size: 60,
      // },
      {
        header: "Employee's Name",
        accessorKey: 'name',
        cell: ({ row }) => row.original.name,
        size: 200,
        enableSorting: true,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        size: 100,
      },
      {
        header: 'Order Date',
        accessorKey: 'createdAt',
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
        size: 180,
        // cell: ({ row }) => row.original.cafe.name,
      },
      {
        header: 'College Name',
        accessorKey: 'collegeName',
        size: 180,
        // cell: ({ row }) => row.original.cafe.name,
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }: { row: Any }) => ActionCell({ row }, ActionOption as () => CellData[]),
        size: 60,
      },
    ];
  };

  const { close, isOpen, open, state } = useOpen<Row<Order>>();

  // if order empty show skeleton

  if (isOrderLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color="gray.10">
        Orders
        {state?.original.name}
      </Text>
      <Table
        loading={false}
        columns={getOrderColumns()}
        data={orders || []}
        emptyMessage="No leave data available."
        getRowCanExpand={() => true}
        renderSubComponent={row => renderSubComponent({ subRow: row, isLoading })}
        classes={{
          tableHeader: 'bg-grey-10',
          tableHeaderCell:
            '[&:nth-child(1)]:pr-0 [&:nth-child(2)]:px-0 [&:nth-child(3)]:pl-0 [&:nth-child(4)]:pl-0 [&:nth-child(5)]:pl-0 [&:nth-child(6)]:px-0',
          tableBodyCell:
            '[&:nth-child(1)]:px-0 [&:nth-child(2)]:px-0 [&:nth-child(3)]:pl-0 [&:nth-child(4)]:pl-0 [&:nth-child(5)]:pl-0 [&:nth-child(6)]:px-0',
        }}
        // onRowClick={row => row.toggleExpanded()}
        onRowClick={row => open(row)}
      />

      <Overlay
        showCloseIcon
        title="ddd"
        isOpen={isOpen}
        body={<div>Hell world</div>}
        onClose={close}
      />
    </>
  );
}

export default AdminOrders;
