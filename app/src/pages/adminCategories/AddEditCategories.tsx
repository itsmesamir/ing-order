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

import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery'; // Adjust or create similar to useMenuUnitsQuery

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

interface MenuCategory {
  id?: number;
  name?: string;
}

function AddEditCategories() {
  const { id } = useParams<{ id?: string }>();
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;
  const { data: currentUser } = useUserStore();

  // Fetch all menu categories
  const { data: menuCategories, isLoading: isMenuCategoriesLoading } = useMenuCategoriesQuery({});

  // If id exists, find the specific category from the menuCategories list
  const category = isEditMode
    ? menuCategories?.find(category => category.id === Number(id))
    : undefined;

  const fields: FormInputField[] = [{ name: 'name', label: 'Name', type: 'text' }];

  // Function to filter and format the category data
  const getInitialValues = (category: MenuCategory = {}): Record<string, string> => {
    return {
      id: category.id?.toString() || '', // Convert number to string
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
      ...(isEditMode ? {} : { createdBy: currentUser?.id ?? 0 }), // Include createdBy only in create mode
    };

    if (isEditMode) {
      updateMutation.mutate(payload); // Call update mutation if in edit mode
    } else {
      createMutation.mutate(payload); // Call create mutation if not in edit mode
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
