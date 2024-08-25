import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';

import Table from 'components/table/Table';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { MenuItem } from 'types/common';

function AdminMenuLists() {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useMenusQuery({});

  const handleAddItemClick = () => {
    history.push('/admin/menus/add');
  };

  const handleEdit = (rowData: MenuItem) => {
    history.push({
      pathname: `/admin/menus/edit/${rowData.id}`,
      state: { id: rowData.id, itemData: rowData },
    });
  };

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
      accessorKey: 'group',
      header: 'Group',
      cell: () => '',
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => (info.getValue() as { name: string }).name,
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      cell: info => (info.getValue() as { name: string }).name,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: info => info.getValue(),
    },
    {
      id: 'edit',
      header: 'Edit',
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row }) => (
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={() => handleEdit(row.original)}
        >
          Edit
        </button>
      ),
    },
  ];

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

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
      <Table columns={columns} data={data} loading={isLoading} emptyMessage="No data available" />
    </div>
  );
}

export default AdminMenuLists;
