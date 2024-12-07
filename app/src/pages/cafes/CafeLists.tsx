import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Button } from '@chakra-ui/react';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal/ActionModal';

import { useCafesQuery } from 'hooks/useCafesQuery';

import { Cafe, RowData, CellData, Any } from 'types/common';

function ActionCell(
  { row: { original } }: { row: { original: RowData<Cafe> } },
  ActionOption: (requestData: RowData<Cafe>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

function CafeLists() {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);

  const { data: cafes, isLoading, error: queryError } = useCafesQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (queryError || error) {
    return (
      <div className="p-4 text-red-500">{error || 'An error occurred while fetching data.'}</div>
    );
  }

  const handleAddCafeClick = () => {
    history.push('/admin/cafes/add');
  };

  const handleEdit = (rowData: Cafe) => {
    history.push(`/admin/cafes/edit/${rowData.id}`);
  };

  const handleDelete = (rowData: Cafe) => {
    // Implement your delete logic here
    console.log('Delete cafe:', rowData);
  };

  const ActionOption = () =>
    useMemo(
      () => [
        {
          name: 'Edit',
          icon: <FiEdit />,
          state: (rowData: Cafe) => {
            handleEdit(rowData);
          },
        },
        {
          name: 'Delete',
          className: 'text-red-500',
          icon: <FiTrash />,
          state: (rowData: Cafe) => {
            handleDelete(rowData);
          },
        },
      ],
      []
    );

  const columns: Array<ColumnDef<Cafe>> = [
    {
      accessorKey: 'sn',
      header: 'SN',
      cell: info => info.row.index + 1,
    },
    {
      accessorKey: 'collegeId',
      header: 'College ID',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'location',
      header: 'Location',
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
        <h1 className="font-bold text-2xl">Cafe Lists</h1>
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            colorScheme="primary"
            onClick={handleAddCafeClick}
            aria-label="Add new cafe"
          >
            Add Cafe +
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={cafes || []}
        loading={isLoading}
        emptyMessage="No data available"
      />
    </div>
  );
}

export default CafeLists;
