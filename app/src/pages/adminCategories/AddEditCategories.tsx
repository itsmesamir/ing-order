import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import {
  createMenuCategories,
  updateMenuCategories,
  fetchMenuCategoriesById,
} from 'services/menus';

import useUserStore from 'stores/useUserStore';

import Form, { FormInputField } from 'components/Form';

import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

interface MenuCategory {
  id?: number;
  parentId?: number;
  name?: string;
}

function AddEditCategories() {
  const { id } = useParams<{ id?: string }>();
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;
  const { data: currentUser } = useUserStore();

  const { data: menuCategories, isLoading: isMenuCategoriesLoading } = useMenuCategoriesQuery({});

  const category = isEditMode
    ? menuCategories?.find(category => category.id === Number(id))
    : undefined;

  const fields: FormInputField[] = [
    {
      name: 'parentId',
      label: 'Parent Category',
      type: 'select',
      options:
        menuCategories?.map(category => ({
          value: category.id,
          label: category.name || `Category ${category.id}`,
        })) || [],
    },
    { name: 'name', label: 'Name', type: 'text' },
  ];

  const getInitialValues = (category: MenuCategory = {}): Record<string, string> => {
    return {
      id: category.id?.toString() || '',
      parentId: category.parentId?.toString() || '',
      name: category.name || '',
    };
  };

  const createMutation = useMutation({
    mutationFn: createMenuCategories,
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: 'Menu category created successfully.',
      });
    },
    onError: submitError => {
      handleError(submitError);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, string | number | boolean>) =>
      updateMenuCategories(Number(id), data),
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: 'Menu category updated successfully.',
      });
    },
    onError: submitError => {
      handleError(submitError);
    },
  });

  const handleSubmit = (data: Record<string, string | number | boolean>) => {
    const payload = {
      ...data,
      ...(isEditMode ? {} : { createdBy: currentUser?.id ?? 0 }),
    };

    if (isEditMode) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  if (isMenuCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl pb-4">
        {isEditMode ? 'Edit Menu Category' : 'Add Menu Category'}
      </h1>
      <Form
        fields={fields}
        defaultValues={isEditMode ? getInitialValues(category || { id: 0, name: '' }) : undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddEditCategories;
