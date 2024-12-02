import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { Flex } from '@chakra-ui/layout';
import {
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Select,
  Box,
  Text,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useFieldArray, useForm } from 'react-hook-form';

import { fetchOrders, updateOrderById, updateOrderStatusById } from 'services/oders';

import Link from 'components/Link';
import Table from 'components/table/Table';
import Loading from 'components/common/Loading';
import ActionModal from 'components/common/actionModal';
import ExpandButton from 'components/common/button/ExpandButton';
import { DivWrapper } from 'components/table/tableCells';
import MyOverlay from 'components/common/myOverlay';
import Modal from 'components/common/modal';
import OrderStatusColor from 'components/common/orders/OrderStatusColor';
import Form, { FormInputField } from 'components/Form';
import Dropdown from 'components/common/dropdown';

import useOpen from 'hooks/useOpen';

import { getFormattedDate } from 'utils/date';
import { handleError } from 'utils/handleError';
import { success } from 'utils/toast';

import {
  Any,
  CellData,
  MenuItem,
  Order,
  OrderItemStatusEnum,
  OrderStatusEnum,
  RowData,
} from 'types/common';

import paths from 'constants/paths';
import queryKey from 'constants/queryKey';
import { MMMM_DD_YYYY_H_MM_A } from 'constants/date';

import SubRowComponent from './SubRowComponent';

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

  return <SubRowComponent data={row.original} isLoading={isLoading} />;
};

function AdminOrders() {
  const [filter, setFilter] = useState(statusTypes[0].id);

  const [isUpdating, setIsUpdating] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: [queryKey.orders, filter],
    queryFn: ({ signal }: Any) => fetchOrders(filter ? { status: filter } : {}, signal),
    enabled: true,
  });

  const queryClient = useQueryClient();

  const defaultImageUrl =
    'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg';

  const isOrderLoading = !orders || isLoading;

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

  const getOrderColumns = (): Array<ColumnDef<Order>> => {
    return [
      // {
      //   header: ' ',
      //   size: 40,
      //   cell: ({ row }) => {
      //     const expand = row.getCanExpand()
      //       ? ExpandButton({
      //           onExpand: () => {
      //             row.getToggleExpandedHandler();
      //           },
      //           isExpanded: row.getIsExpanded(),
      //         })
      //       : '';

      //     return DivWrapper({
      //       items: [expand],
      //       className: 'flex items-center',
      //     });
      //   },
      // },
      // {
      //   header: 'Order ID',
      //   cell: ({ row }) => row.original.id,
      //   size: 60,
      // },
      {
        header: "Employee's Name",
        accessorKey: 'name',
        cell: ({ row }) => row.original.name,
        size: 200,
        enableSorting: true,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        size: 100,
      },
      {
        header: 'Order Date',
        accessorKey: 'createdAt',
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
        size: 180,
        // cell: ({ row }) => row.original.cafe.name,
      },
      {
        header: 'College Name',
        accessorKey: 'collegeName',
        size: 180,
        // cell: ({ row }) => row.original.cafe.name,
      },
      {
        header: '',
        accessorKey: 'actions',
        cell: ({ row }: { row: Any }) => ActionCell({ row }, ActionOption as () => CellData[]),
        size: 60,
      },
    ];
  };

  const { close, isOpen, open, state } = useOpen<Row<Order>>();

  // if order empty show skeleton

  if (isOrderLoading) {
    return <Loading />;
  }

  const fields: FormInputField[] = [
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: Object.values(OrderStatusEnum).map(item => ({ label: item, value: item })),
    },
  ];

  const handleSubmit = async (data: Record<string, string | number | boolean>) => {
    if (!state?.original) {
      return;
    }

    const payload = {
      ...data,
    };

    try {
      setIsUpdating(true);

      await updateOrderStatusById(state?.original.id, payload);

      queryClient.invalidateQueries({ queryKey: [queryKey.orders, filter] });

      success({
        title: 'Success',
        message: `Order Status updated successfully.`,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsUpdating(false);
    }

    // if (isEditMode) {
    //   updateMutation.mutate(payload);
    // } else {
    //   createMutation.mutate(payload);
    // }
  };

  const getInitialValues = (item?: Order): Record<string, string | number | boolean> => {
    return {
      status: item?.status || '',
    };
  };

  const [menuStatus, setMenuStatus] = useState();

  const { register, control, reset, trigger, setError } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const {
    fields: orderItemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'orderItems',
  });

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color="gray.10">
        Orders
        {state?.original.name}
      </Text>

      <Table
        loading={false}
        columns={getOrderColumns()}
        data={orders || []}
        emptyMessage="No leave data available."
        getRowCanExpand={() => true}
        renderSubComponent={row => renderSubComponent({ subRow: row, isLoading })}
        classes={{
          tableHeader: 'bg-grey-10',
          tableHeaderCell:
            '[&:nth-child(1)]:pr-0 [&:nth-child(2)]:px-0 [&:nth-child(3)]:pl-0 [&:nth-child(4)]:pl-0 [&:nth-child(5)]:pl-0 [&:nth-child(6)]:px-0',
          tableBodyCell:
            '[&:nth-child(2)]:px-0 [&:nth-child(3)]:pl-0 [&:nth-child(4)]:pl-0 [&:nth-child(5)]:pl-0 [&:nth-child(6)]:px-0',
        }}
        onRowClick={row => open(row)}
      />

      <MyOverlay
        showCloseIcon
        title={`${state?.original?.name}'s Order`}
        isOpen={isOpen}
        body={
          state?.original ? (
            <div className="overflow-y-auto flex gap-y-4 flex-col p-4">
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-1">
                  <div>
                    <p className="text-xl text-grey-900 font-medium">{state?.original?.cafeName}</p>
                    <p className="text-base text-grey-800">{state?.original?.cafeLocation}</p>
                  </div>

                  <OrderStatusColor status={state?.original?.status} />

                  <p className="text-base text-grey-800">
                    Total Price: {state?.original?.totalPrice}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-grey-900 font-medium mb-2">Menu Items</p>
                  {state?.original?.items?.length > 0 ? (
                    <div className="flex flex-col gap-y-4">
                      {state?.original?.items?.map(item => (
                        <div className="flex gap-x-2">
                          <div className="w-16 h-16 overflow-hidden">
                            <img
                              src={item?.menu?.imageUrl || defaultImageUrl}
                              alt="menu"
                              className="h-16 w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-grey-900 font-medium">{item?.menu?.name}</p>
                            <span>
                              <p className="text-sm text-grey-900">
                                Quantity:{' '}
                                <span className="text-grey-900 font-medium">{item?.quantity}</span>
                              </p>
                              <p className="text-sm text-grey-900 font-medium">$ {item?.price}</p>
                            </span>
                          </div>
                          <div>
                            {orderItemFields.map((field, index) => (
                              <div>d</div>
                            ))}
                          </div>{' '}
                          <Dropdown
                            onDropDownChange={e => {
                              console.log(e);
                            }}
                            options={Object.values(OrderItemStatusEnum).map(item => ({
                              label: item,
                              value: item,
                            }))}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No Item Added</p>
                  )}
                </div>

                <Form
                  fields={fields}
                  defaultValues={getInitialValues(state?.original as Any)}
                  onSubmit={handleSubmit}
                  isSubmitting={isUpdating}
                  onCancel={close}
                />
              </div>
            </div>
          ) : null
        }
        onClose={close}
      />

      {/* <Modal isOpen={isOpen} onClose={close} header={{ title: 'Are you sure?' }}>
        <h1>hello world {state?.original?.name}</h1>
      </Modal> */}
    </>
  );
}

export default AdminOrders;
