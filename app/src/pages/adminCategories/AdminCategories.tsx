import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Button } from '@chakra-ui/react';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal/ActionModal';

import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';

import { Any, CellData, MenuCategory, Order, RowData } from 'types/common';

function ActionCell(
  { row: { original } }: { row: { original: RowData<Order> } },
  ActionOption: (requestData: RowData<Order>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

function AdminCategories() {
  const history = useHistory();

  const { data: menuCategories, isLoading, error: queryError } = useMenuCategoriesQuery({});

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (queryError) {
    return (
      <div className="p-4 text-red-500">
        {queryError.message || 'An error occurred while fetching data.'}
      </div>
    );
  }

  const handleAddItemClick = () => {
    history.push('/admin/menus/categories/add');
  };

  const handleEdit = (rowData: MenuCategory) => {
    history.push({
      pathname: `/admin/menus/categories/edit/${rowData.id}`,
      state: { id: rowData.id, itemData: rowData },
    });
  };

  const handleDelete = (rowData: MenuCategory) => {
    // Implement your delete logic here
    console.log('Delete item:', rowData);
  };

  const ActionOption = () =>
    useMemo(
      () => [
        {
          name: 'Edit',
          icon: <FiEdit />,
          state: (rowData: MenuCategory) => {
            handleEdit(rowData);
          },
        },

        {
          name: 'Delete',
          className: 'text-red-500',
          icon: <FiTrash />,
          state: (rowData: MenuCategory) => {
            console.log(rowData);
          },
          // state: (rowData: Order) => setDeleteModalOpenFor(rowData?.id),
        },
      ],
      []
    );

  const columns: Array<ColumnDef<MenuCategory>> = [
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

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-2xl">Menu Categories</h1>
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            colorScheme="primary"
            onClick={handleAddItemClick}
            aria-label="Add new category"
          >
            Add Item +
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={menuCategories || []}
        loading={isLoading}
        emptyMessage="No data available"
      />
    </div>
  );
}

export default AdminCategories;
