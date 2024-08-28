import React, { useEffect, useMemo, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { ColumnDef } from '@tanstack/react-table';

import { fetchUserById, fetchUsers } from 'services/users';

import Table from 'components/table/Table';
import ActionModal from 'components/common/actionModal';
import DeleteConfirm from 'components/common/deleteConfirm';

import history from 'utils/history';
import { classNames } from 'utils/className';
import { parseQuery as parse } from 'utils/queryParams';

import { User } from 'types/User';
import { Any, CellData, DefaultObject, RowData } from 'types/common';

import en from 'constants/en';

function ActionCell(
  { row: { original } }: { row: { original: RowData<User> } },
  ActionOption: (requestData: RowData<User>) => CellData[]
) {
  const option = ActionOption(original);

  return <ActionModal cellData={option} rowData={original} />;
}

const ActionOption = (setDeleteModalOpenFor: React.Dispatch<React.SetStateAction<User | null>>) =>
  useMemo(
    () => [
      {
        name: 'Edit roles',
        icon: <FiEdit />,
        state: (rowData: User) => {
          console.log(rowData);
        },
      },

      {
        name: 'Delete roles',
        className: 'text-red-500',
        icon: <FiTrash />,
        state: (rowData: User) => {
          console.log(rowData);
          setDeleteModalOpenFor(rowData);
        },
        // state: (rowData: Order) => setDeleteModalOpenFor(rowData?.id),
      },
    ],
    []
  );

const getColumns = (queryParams: Any): Array<ColumnDef<User>> => {
  return [
    {
      header: 'S/N',
      accessorKey: 'sn',
      size: 56,
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row: { index } }: { row: { index: number } }) => <span>{index + 1}</span>,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      size: 325,
      cell: ({ row }) => {
        return (
          <span className="capital-text employees__table-text">{`${row?.original.name}`}</span>
        );
      },
    },
    {
      header: () => <div className="d-flex align-items-center">Role(s)</div>,
      accessorKey: 'role',
      enableSorting: false,
      cell: ({ row: props }) => {
        const { roles } = props.original;
        const roleIds = queryParams.roleIds ? queryParams.roleIds.split(',') : [];

        return (
          <div className="employee__role" id={`user-role-${props.original.id}`}>
            {roles?.length > 0
              ? roles.map(role => {
                  const matchId = roleIds?.find((id: number) => id === role.id);
                  return (
                    <span
                      key={role.id}
                      className={classNames('role-table-item', { 'text-bold': matchId })}
                    >
                      {role.name}
                    </span>
                  );
                })
              : '-'}
          </div>
        );
      },
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: { row: Any }) => ActionCell({ row }, ActionOption as () => CellData[]),
      size: 160,
    },
  ];
};

function UserRoles(props: Any) {
  const { location } = history;
  const [userRoles, setUserRoles] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpenFor, setDeleteModalOpenFor] = useState<User | null>(null);
  const queryParams: DefaultObject = parse(location.search);

  const fetchUserRoles = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers({});
      setUserRoles(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, []);

  console.log(userRoles);

  return (
    <div>
      <Table
        loading={isLoading}
        columns={getColumns(queryParams)}
        data={userRoles}
        getRowCanExpand={() => true}
        emptyMessage=""
      />
      <DeleteConfirm
        actionLabel={en.confirmDelete}
        title={en.removeMember}
        isModalOpen={!!deleteModalOpenFor}
        onApplyClick={() => {}}
        // isSubmitting={false}
        closeModal={() => setDeleteModalOpenFor(null)}
        message={`You are about to role of ${deleteModalOpenFor?.name}.`}
      />
    </div>
  );
}

export default UserRoles;
