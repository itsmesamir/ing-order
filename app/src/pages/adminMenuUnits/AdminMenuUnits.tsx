import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Button } from '@chakra-ui/react';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal/ActionModal';

import { useMenuUnitsQuery } from 'hooks/useMenuUnitsQuery';

import { MenuUnit, RowData, CellData, Any } from 'types/common';

function ActionCell(
  { row: { original } }: { row: { original: RowData<MenuUnit> } },
  ActionOption: (requestData: RowData<MenuUnit>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

function AdminUnits() {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);

  const { data: menuUnits, isLoading, error: queryError } = useMenuUnitsQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (queryError || error) {
    return (
      <div className="p-4 text-red-500">{error || 'An error occurred while fetching data.'}</div>
    );
  }

  const handleAddItemClick = () => {
    history.push('/admin/menus/units/add');
  };

  const handleEdit = (rowData: MenuUnit) => {
    history.push(`/admin/menus/units/edit/${rowData.id}`);
  };

  const handleDelete = (rowData: MenuUnit) => {
    // Implement your delete logic here
    console.log('Delete item:', rowData);
  };

  const ActionOption = () =>
    useMemo(
      () => [
        {
          name: 'Edit',
          icon: <FiEdit />,
          state: (rowData: MenuUnit) => {
            handleEdit(rowData);
          },
        },
        {
          name: 'Delete',
          className: 'text-red-500',
          icon: <FiTrash />,
          state: (rowData: MenuUnit) => {
            handleDelete(rowData);
          },
        },
      ],
      []
    );

  const columns: Array<ColumnDef<MenuUnit>> = [
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
      accessorKey: 'symbol',
      header: 'Symbol',
      cell: info => info.getValue(),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: { row: Any }) => ActionCell({ row }, ActionOption as () => CellData[]),
      size: 60,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Menu Units</h1>
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
        data={menuUnits || []}
        loading={isLoading}
        emptyMessage="No data available"
      />
    </div>
  );
}

export default AdminUnits;
