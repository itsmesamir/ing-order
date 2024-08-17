import { Image } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';

import Table from 'components/table/Table';

import { interpolate } from 'utils/interpolate';
import { createRoute } from 'utils/route';

import { Any } from 'types/common';

import paths from 'constants/paths';

function AvatarComponent(item: Any) {
  return (
    <a
      className="flex items-center hover:bg-orange-100 p-4 cursor-pointer"
      href={interpolate(createRoute([paths.menus, paths.id, paths.detail]), {
        id: item?.id,
      })}
    >
      <Image
        boxSize="40px"
        objectFit="cover"
        src={item?.imageUrl}
        alt={item?.name}
        className="rounded-lg"
      />
      <div className="ml-4">
        <p className="text-gray-600 font-semibold">{item?.name}</p>
        <p className="text-sm text-gray-400">{item?.cafe?.name}</p>
      </div>
    </a>
  );
}

function SubRowComponent(props: Any) {
  const { data, isLoading } = props;

  const getOrderSubColumns = (): Array<ColumnDef<Any>> => {
    return [
      {
        header: 'SN',
        cell: ({ row: { index } }: { row: { index: number } }) => index + 1,
        size: 40,
      },
      {
        header: 'Menu ID',
        accessorKey: 'menuId',
        cell: ({ row }) => row.original.menu.id,
        size: 40,
      },
      {
        header: 'Menu',
        cell: ({ row }) => {
          return AvatarComponent(row.original.menu);
        },
        size: 40,
      },
      {
        header: 'Menu Name',
        accessorKey: 'menuName',
        cell: ({ row }) => row.original.menu.name,
        size: 240,
        enableSorting: true,
      },
      {
        header: 'Price',
        accessorKey: 'price',
        size: 100,
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
        size: 100,
      },
      {
        header: 'Discount',
        accessorKey: 'discount',
        size: 100,
      },
      //   {
      //     header: 'Actions',
      //     accessorKey: 'actions',
      //     cell: ({ row }: { row: Any }) => ({ row }, ActionOption as () => CellData[]),
      //     size: 160,
      //   },
    ];
  };

  return (
    <div className="shadow-md bg-grey-15 p-6">
      <Table
        loading={isLoading}
        columns={getOrderSubColumns()}
        data={data.items}
        emptyMessage="No items found"
        classes={{
          tableHeaderCell:
            'text-grey-50 font-normal [&:nth-child(6)]:pl-0 [&:nth-child(7)]:pl-0 [&:nth-child(8)]:pl-0 [&:nth-child(9)]:pl-0',

          tableBodyCell:
            '[&:nth-child(6)]:pl-0 [&:nth-child(7)]:pl-0 [&:nth-child(8)]:pl-0 [&:nth-child(9)]:pl-0',
        }}
        parentClassName="rounded-[4px]"
        initialState={{
          sorting: [
            {
              id: 'allocationWithType',
              desc: false,
            },
          ],
        }}
      />
    </div>
  );
}

export default SubRowComponent;
