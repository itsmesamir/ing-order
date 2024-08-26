import { useEffect, useState } from 'react';

import { fetchUsers } from 'services/users';

import DeleteConfirm from 'components/common/deleteConfirm';
import Table from 'components/table/Table';

import { interpolate } from 'utils/interpolate';

import { User } from 'types/User';

import en from 'constants/en';

import { columns } from './columns';

function UserRoles() {
  const [userRoles, setUserRoles] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpenFor, setDeleteModalOpenFor] = useState<User | null>(null);

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

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns(setDeleteModalOpenFor)}
        data={userRoles}
        getRowCanExpand={() => true}
        emptyMessage=""
      />
      <DeleteConfirm
        actionLabel={en.BUTTON.CONFIRM_DELETE}
        title={interpolate(en.MODEL.DELETE, { title: deleteModalOpenFor?.name as string })}
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
