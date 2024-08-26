import { CellContext, ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { User } from 'types/User';
import { Any, CellData } from 'types/common';

import { ActionCell, TextCell, RoleCell } from './tableCells';

export const columns = (
  setDeleteModalOpenFor: React.Dispatch<React.SetStateAction<User | null>>
): Array<ColumnDef<User>> => {
  return [
    {
      header: 'S/N',
      accessorKey: 'sn',
      size: 56,
      enableSorting: false,
      enableColumnFilter: false,
      cell: (props: CellContext<User, unknown>) => TextCell(props.row.index + 1),
    },

    {
      header: 'Name',
      accessorKey: 'name',
      size: 325,
      cell: (props: CellContext<User, unknown>) =>
        TextCell(props.row.original.name, 'capital-text employees__table-text'),
    },

    {
      header: 'Role(s)',
      accessorKey: 'role',
      enableSorting: false,
      cell: (props: CellContext<User, unknown>) => RoleCell(props.row.original),
    },

    {
      header: ' ',
      accessorKey: 'actions',
      size: 60,
      maxSize: 60,
      cell: ({ row }: { row: Any }) => {
        const ActionOption = () => [
          {
            name: 'Edit roles',
            icon: FiEdit,
            state: (rowData: User) => {
              console.log(rowData);
            },
          },

          {
            name: 'Delete roles',
            className: 'text-red-500',
            icon: FiTrash,
            state: (rowData: User) => {
              console.log(rowData);
              setDeleteModalOpenFor(rowData);
            },
            // state: (rowData: Order) => setDeleteModalOpenFor(rowData?.id),
          },
        ];

        return ActionCell({ row }, ActionOption as Any);
      },
    },
  ];
};
