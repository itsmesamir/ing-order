import { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Button, Select } from '@chakra-ui/react';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { parseQuery } from 'utils/queryParams';

import { Any, CellData, DefaultObject, MenuItem, Order, RowData } from 'types/common';

function ActionCell(
  { row: { original } }: { row: { original: RowData<Order> } },
  ActionOption: (requestData: RowData<Order>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

function AdminMenuLists() {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, isLoading } = useMenusQuery({});

  const { location } = history;
  const queryParams: DefaultObject = parseQuery(location.search);

  const handleAddItemClick = () => {
    history.push('/admin/menus/add');
  };

  const handleEdit = (rowData: MenuItem) => {
    history.push({
      pathname: `/admin/menus/edit/${rowData.id}`,
      state: { id: rowData.id, itemData: rowData },
    });
  };

  const actionOptions = () =>
    useMemo(
      () => [
        {
          name: 'Edit',
          icon: <FiEdit />,
          state: (rowData: MenuItem) => {
            handleEdit(rowData);
          },
        },

        {
          name: 'Delete',
          className: 'text-red-500',
          icon: <FiTrash />,
          state: (rowData: MenuItem) => {
            console.log(rowData);
          },
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
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: { row: Any }) => ActionCell({ row }, actionOptions as () => CellData[]),
      size: 160,
    },
  ];

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  const filteredData = selectedCategory
    ? data.data.filter(item => item.category?.name === selectedCategory)
    : data.data;

  const uniqueCategories = Array.from(
    new Set(data.data.filter(item => item.category).map(item => item.category!.name))
  ).map(categoryName => ({
    name: categoryName,
  }));

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="font-bold text-2xl">Menu Lists</h1>

        <div className="flex space-x-4">
          <Select
            placeholder="Filter by Category"
            value={selectedCategory || ''}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-30"
          >
            <option value="">All</option>
            {Array.from(
              new Set(data.data.filter(item => item.category).map(item => item.category!.name))
            ).map(categoryName => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </Select>

          <Button type="button" colorScheme="primary" onClick={handleAddItemClick} className="w-40">
            Add Item +
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        loading={isLoading}
        emptyMessage="No data available"
        pagination={{ pageData: data.meta, pageCount: queryParams.page }}
      />
    </div>
  );
}

export default AdminMenuLists;
