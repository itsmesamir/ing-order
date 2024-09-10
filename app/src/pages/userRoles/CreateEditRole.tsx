import React, { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Flex } from '@chakra-ui/react';
import Select from 'react-select';

import { addUserRoles, fetchUserRoles, fetchUsers } from 'services/users';
import { fetchRoles } from 'services/roles';

import { success } from 'utils/toast';
import { handleError } from 'utils/handleError';

import { Any, Role } from 'types/common';
import { User } from 'types/User';

import en from 'constants/en';

type FormData = {
  user: User | null;
  roles: Role[];
};

interface CreateEditUserRoleProps {
  cancelLabel?: string;
  isSubmitting: boolean | undefined;
  closeModal: () => void;
  isEditable: boolean;
  rowData: User | null;
  setShouldFetchUserRoles: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateEditUserRole({
  cancelLabel = 'Cancel',
  isSubmitting,
  closeModal,
  isEditable,
  rowData,
  setShouldFetchUserRoles,
}: CreateEditUserRoleProps) {
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isFetchingRoles, setIsFetchingRoles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRolesList = useCallback(async () => {
    try {
      setIsFetchingRoles(true);
      const data = await fetchRoles({});
      setRoles(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingRoles(false);
    }
  }, []);

  const fetchUsersList = useCallback(async () => {
    try {
      setIsFetchingUsers(true);
      const data = await fetchUsers({});
      setUsers(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingUsers(false);
    }
  }, []);

  const fetchUserRolesList = useCallback(
    async (userId: number) => {
      try {
        setIsFetchingRoles(true);
        const data = await fetchUserRoles(userId);
        setValue('roles', data || []);
      } catch (err) {
        handleError(err);
      } finally {
        setIsFetchingRoles(false);
      }
    },
    [setValue]
  );

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      if (!data.user) {
        throw new Error('Please select a user.');
      }

      await addUserRoles(data.user.id, data.roles);
      success({
        title: 'Success',
        message: `You have successfully added ${data.user.name} for the role.`,
      });

      setShouldFetchUserRoles(true);
      closeModal();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
    fetchRolesList();
    if (rowData?.id) {
      fetchUserRolesList(rowData.id);
    }
  }, [fetchRolesList, fetchUsersList, fetchUserRolesList, rowData?.id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="omb-modal__content wp-100 p-4">
        <div className="omb-form-group pb-4">
          <label htmlFor="user">User:</label>
          <Controller
            control={control}
            name="user"
            defaultValue={rowData || null}
            render={({ field }) => (
              <Select
                {...field}
                options={users}
                value={field.value}
                getOptionLabel={user => user.name}
                getOptionValue={user => user.id.toString()}
                isDisabled={isEditable}
                onChange={(selectedUser: Any) => {
                  field.onChange(selectedUser);
                  fetchUserRolesList(selectedUser.id);
                }}
                isLoading={isFetchingUsers}
              />
            )}
          />
        </div>
        <div className="omb-form-group pb-4">
          <label htmlFor="roles">Roles:</label>
          <Controller
            control={control}
            name="roles"
            defaultValue={rowData?.roles || []}
            render={({ field }) => (
              <Select
                {...field}
                options={roles}
                getOptionLabel={role => role.name}
                getOptionValue={role => role.id.toString()}
                isMulti
                isLoading={isFetchingRoles}
              />
            )}
          />
        </div>
        <Flex className="omb-modal__buttons flex pt-4 gap-10">
          <Button
            type="submit"
            colorScheme="primary"
            isLoading={isLoading || isSubmitting}
            className="min-wpx-100 d-flex justify-content-center position-relative"
          >
            {!isEditable ? `${en.BUTTON.ADD_ROLE}` : `${en.BUTTON.EDIT_ROLE}`}
          </Button>
          <Button type="button" colorScheme="red" onClick={closeModal}>
            {cancelLabel}
          </Button>
        </Flex>
      </div>
    </form>
  );
}

export default CreateEditUserRole;
