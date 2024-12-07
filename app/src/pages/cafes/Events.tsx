import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Button } from '@chakra-ui/react';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal/ActionModal';

import { RowData, CellData, Any } from 'types/common';

interface Event {
  id: number;
  name: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
}

const dummyEvents: Event[] = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    location: 'New York City',
    description: 'A conference about the latest trends in tech.',
    start_date: '2024-12-10',
    end_date: '2024-12-12',
  },
  {
    id: 2,
    name: 'Music Fest',
    location: 'Los Angeles',
    description: 'A festival featuring various music artists.',
    start_date: '2024-12-15',
    end_date: '2024-12-18',
  },
];

function ActionCell(
  { row: { original } }: { row: { original: RowData<Event> } },
  ActionOption: (requestData: RowData<Event>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

function Events() {
  const [events, setEvents] = useState<Event[]>(dummyEvents);

  const handleAddEventClick = () => {
    console.log('Redirect to Add Event Page'); // Replace with actual navigation logic
  };

  const handleEdit = (rowData: Event) => {
    console.log('Redirect to Edit Event:', rowData); // Replace with actual navigation logic
  };

  const handleDelete = (rowData: Event) => {
    console.log('Delete event:', rowData);
    setEvents(events.filter(event => event.id !== rowData.id));
  };

  const ActionOption = () => [
    {
      name: 'Edit',
      icon: <FiEdit />,
      state: (rowData: Event) => {
        handleEdit(rowData);
      },
    },
    {
      name: 'Delete',
      className: 'text-red-500',
      icon: <FiTrash />,
      state: (rowData: Event) => {
        handleDelete(rowData);
      },
    },
  ];

  const columns: Array<ColumnDef<Event>> = [
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
      accessorKey: 'location',
      header: 'Location',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'start_date',
      header: 'Start Date',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'end_date',
      header: 'End Date',
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
        <h1 className="font-bold text-2xl">Events</h1>
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            colorScheme="primary"
            onClick={handleAddEventClick}
            aria-label="Add new event"
          >
            Add Event +
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={events || []}
        loading={false}
        emptyMessage="No events available"
      />
    </div>
  );
}

export default Events;
