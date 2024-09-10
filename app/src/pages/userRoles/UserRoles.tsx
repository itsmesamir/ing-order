import { useEffect, useState } from 'react';

import { fetchUsers } from 'services/users';

import DeleteConfirm from 'components/common/deleteConfirm';
import Table from 'components/table/Table';
import TableTitle from 'components/table/components/TableTitle';

import { interpolate } from 'utils/interpolate';
import { handleError } from 'utils/handleError';

import { User } from 'types/User';

import en from 'constants/en';

import { columns } from './columns';
import CreateEditUserRolesModal from './CreateEditUserRolesModal';

function UserRoles() {
  const [userRoles, setUserRoles] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetchUserRoles, setShouldFetchUserRoles] = useState(false);
  const [deleteModalOpenFor, setDeleteModalOpenFor] = useState<User | null>(null);
  const [editModalOpenFor, setEditModalOpenFor] = useState<User | null>(null);

  const fetchUserRoles = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers({});
      setUserRoles(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, [shouldFetchUserRoles]);

  return (
    <div>
      <TableTitle tableTitle="User Roles" itemName="Users" start={40} total={150} />
      <Table
        loading={isLoading}
        columns={columns(setDeleteModalOpenFor, setEditModalOpenFor)}
        data={userRoles}
        getRowCanExpand={() => true}
        emptyMessage=""
        parentClassName="px-4"
        pagination={{
          pageCount: 1,
          pageData: {
            page: 1,
            pageSize: 1,
            total: 1,
            count: 1,
          },
        }}
      />
      <DeleteConfirm
        actionLabel={en.BUTTON.CONFIRM_DELETE}
        title={interpolate(en.MODEL.DELETE, { title: deleteModalOpenFor?.name as string })}
        isModalOpen={!!deleteModalOpenFor}
        onApplyClick={() => {}}
        closeModal={() => setDeleteModalOpenFor(null)}
        message={`You are about to role of ${deleteModalOpenFor?.name}.`}
      />
      <CreateEditUserRolesModal
        title={editModalOpenFor ? 'Edit User Role' : 'Create User Role'}
        isEditable={!!editModalOpenFor}
        isModalOpen={!!editModalOpenFor}
        closeModal={() => setEditModalOpenFor(null)}
        isSubmitting={false}
        rowData={editModalOpenFor}
        setShouldFetchUserRoles={setShouldFetchUserRoles}
      />
    </div>
  );
}

export default UserRoles;
