/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { updateUserById } from 'services/users';

import useUserStore from 'stores/useUserStore';

import DashboardLayout from 'components/DashboardLayout';
import { notify } from 'components/Toast';

import { useRolesQuery } from 'hooks/useRolesQuery';
import { useDesignationsQuery } from 'hooks/useDesignationsQuery';
import { useUsersQuery } from 'hooks/useUsersQuery';
import { useUserQuery } from 'hooks/useUserQuery';

import { handleError } from 'utils/handleError';

import { Any, Role, Roles } from 'types/common';

import queryKey from 'constants/queryKey';

function Profile() {
  const designationsQuery = useDesignationsQuery({});
  const rolesQuery = useRolesQuery({});
  const { handleSubmit, register, reset, setValue, formState } = useForm();
  const [userRoles, setUserRoles] = useState<number[]>([]);

  const { id: userId } = useParams<{ id: string }>();
  const { data: currentUser } = useUserStore();

  const profileId = parseInt(userId, 10) || (currentUser?.id as number);

  const { data: designations = [] } = designationsQuery;
  const { data: roles = [] } = rolesQuery;
  const { data: user } = useUserQuery(profileId, {});
  const { data: managers } = useUsersQuery({ role: Roles.MANAGER, excludeIds: profileId });

  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: (body: Any) => {
      return updateUserById(user?.id as number, body);
    },

    onSuccess: () => {
      notify({ type: 'success', autoClose: 0, data: { title: 'Success', message: 'Success' } });
      queryClient.invalidateQueries({ queryKey: [queryKey.user] });
    },

    onError: error => {
      handleError(error);
    },
  });

  useEffect(() => {
    if (user) {
      const newUserRoles = user.roles.map((role: Role) => role.id);
      setUserRoles(newUserRoles);

      const defaultValues = {
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        department: user?.department || '',
        designationId: user?.designation?.id || '',
        managerId: user?.manager?.id || '',
        roleIds: newUserRoles,
      };

      reset(defaultValues, { keepDirty: false });
    }
  }, [user]);

  const onRoleChange = (e: React.ChangeEvent<HTMLInputElement>, role: Role) => {
    const roleId = role.id;
    const isChecked = e.target.checked;

    const updatedRoles = isChecked ? [...userRoles, roleId] : userRoles.filter(id => id !== roleId);

    setUserRoles(updatedRoles);
    setValue('roleIds', updatedRoles);
  };

  const onSubmit = (formData: Any) => {
    const data = { ...formData };

    if (!formData.managerId) {
      delete data.managerId;
    }

    updateUser.mutate(data);
  };

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl">
        <Flex direction="column" alignItems="flex-start" mx={5}>
          <Text as="h1" fontWeight="bold" mb={5} mt={5}>
            Profile
          </Text>

          <Container bgColor="white" p={10} borderRadius="md" boxShadow="md" maxW="6xl" w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6} align="stretch" w="100%">
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" defaultValue={user?.name || ''} {...register('name')} />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" defaultValue={user?.email || ''} {...register('email')} />
                </FormControl>

                <FormControl id="phone">
                  <FormLabel>Phone</FormLabel>
                  <Input type="text" defaultValue={user?.phone || ''} {...register('phone')} />
                </FormControl>

                <FormControl id="department">
                  <FormLabel>Department</FormLabel>
                  <Input
                    type="text"
                    defaultValue={user?.department || ''}
                    {...register('department')}
                  />
                </FormControl>

                <FormControl id="designationId">
                  <FormLabel>Designation</FormLabel>
                  <Select
                    placeholder="Select your designation"
                    defaultValue={user?.designation?.id}
                    {...register('designationId')}
                  >
                    {designations.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="managerId">
                  <FormLabel>Manager</FormLabel>
                  <Select
                    placeholder="Select the manager"
                    defaultValue={user?.manager?.id}
                    {...register('managerId')}
                  >
                    {managers?.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="roleIds">
                  <FormLabel>Roles</FormLabel>
                  <VStack align="start">
                    {roles.map((role: Role) => (
                      <Checkbox
                        key={role.id}
                        isChecked={userRoles.includes(role.id)}
                        onChange={e => onRoleChange(e, role)}
                      >
                        {role.name}
                      </Checkbox>
                    ))}
                  </VStack>
                </FormControl>

                <Button
                  type="submit"
                  bg="#4f46e5"
                  _hover={{ bg: '#6366f1' }}
                  color="white"
                  isDisabled={!formState.isDirty}
                >
                  Save
                </Button>
              </VStack>
            </form>
          </Container>
        </Flex>
      </Container>
    </DashboardLayout>
  );
}

export default Profile;
