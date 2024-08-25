import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal/ActionModal';

import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';

import { Any, CellData, MenuItem, Order, RowData } from 'types/common';

function ActionCell(
  { row: { original } }: { row: { original: RowData<Order> } },
  ActionOption: (requestData: RowData<Order>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}
function AdminCategories() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: menuCateogries, isLoading: isMenuCategoriesLoading } = useMenuCategoriesQuery({});

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

  const columns: Array<ColumnDef<MenuItem>> = [
    {
      accessorKey: 'sn',
      header: 'SN',
      cell: info => info.row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: { row: Any }) => ActionCell({ row }, ActionOption as () => CellData[]),
      size: 160,
    },
  ];

  const handleAddItemClick = () => {};
  return (
    <div className="p-4">
      <h1>Menu Lists</h1>
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          onClick={handleAddItemClick}
        >
          Add Item +
        </button>
      </div>
      <Table columns={columns} data={data} loading={loading} emptyMessage="No data available" />
    </div>
  );
}
export default AdminCategories;
