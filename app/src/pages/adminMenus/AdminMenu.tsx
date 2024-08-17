import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { Text, Button } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { fetchMenus } from 'services/menus';

import Table from 'components/table/Table';
import Loading from 'components/common/Loading';
import ActionModal from 'components/common/actionModal';
import ExpandButton from 'components/common/button/ExpandButton';
import { DivWrapper } from 'components/table/tableCells';

import { getFormattedDate } from 'utils/date';

import { Any, CellData, MenuItem, Order, OrderStatusEnum, RowData } from 'types/common';

import queryKey from 'constants/queryKey';

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

  return <div>{row}</div>;
};

function AdminMenus() {
  const [filter, setFilter] = useState(statusTypes[0].id);

  const { data: menus, isLoading } = useQuery({
    queryKey: [queryKey.orders, filter],
    queryFn: ({ signal }: Any) => fetchMenus(filter ? { status: filter } : {}, signal),
    enabled: true,
  });

  const defaultImageUrl =
    'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg';

  const isOrderLoading = !menus || isLoading;

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

  const getOrderColumns = (): Array<ColumnDef<MenuItem>> => {
    return [
      {
        header: 'SN',
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
            items: [expand, String(row.index + 1)],
            className: 'flex items-center',
          });
        },
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
        Menus
      </Text>
      <Table
        loading={false}
        columns={getOrderColumns()}
        data={menus || []}
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
        onRowClick={row => row.toggleExpanded()}
      />
    </>
  );
}

export default AdminMenus;
