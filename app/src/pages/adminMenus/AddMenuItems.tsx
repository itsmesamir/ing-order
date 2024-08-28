import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { createMenuItem, updateMenuById } from 'services/menus';

import useUserStore from 'stores/useUserStore'; // <-- Import the user store

import Form, { FormInputField } from 'components/Form';

import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';
import { useCafesQuery } from 'hooks/useCafesQuery';
import { useMenuUnitsQuery } from 'hooks/useMenuUnitsQuery';
import { useMenuByIdQuery } from 'hooks/useMenuByIdQuery';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

import { Any } from 'types/common';

function AddEditMenuItem() {
  const { id } = useParams<{ id?: string }>();
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;

  const { data: menuCategories, isLoading: isMenuCategoriesLoading } = useMenuCategoriesQuery({});
  const { data: cafes, isLoading: isCafesLoading } = useCafesQuery({});
  const { data: menuUnits, isLoading: isMenuUnitsLoading } = useMenuUnitsQuery({});
  const { data: menuItem, isLoading: isMenuItemLoading } = useMenuByIdQuery(
    id as unknown as number
  );

  const { data: currentUser } = useUserStore(); // <-- Get current user

  const fields: FormInputField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    {
      name: 'categoryId',
      label: 'Category',
      type: 'select',
      options: menuCategories?.map(({ id, name }) => ({ label: name, value: id })),
    },
    {
      name: 'unitId',
      label: 'Unit',
      type: 'select',
      options: menuUnits?.map(({ id, name }) => ({ label: name, value: id })),
    },
    {
      name: 'cafeId',
      label: 'Cafe',
      type: 'select',
      options: cafes?.map(({ id, name }) => ({ label: name, value: id })),
    },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'maxOrder', label: 'Max Order', type: 'number' },
    { name: 'preparedTime', label: 'Prepared time', type: 'number' },
    {
      name: 'availability',
      label: 'Availability',
      type: 'select',
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Available', value: 'Available' },
        { label: 'Not Available', value: 'NotAvailable' },
        { label: 'Coming Soon', value: 'ComingSoon' },
      ],
    },
    {
      name: 'isSpecial',
      label: 'Special',
      type: 'select',
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false },
      ],
    },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'discount', label: 'Discount', type: 'number' },
  ];

  // Function to filter and format the menuItem data
  const getInitialValues = (item: Any = {}): Record<string, string | number | boolean> => {
    return {
      name: item.name || '',
      categoryId: item.category?.id || '', // Extract category ID
      unitId: item.unit?.id || '', // Extract unit ID
      cafeId: item.cafe?.id || '', // Extract cafe ID
      description: item.description || '',
      maxOrder: item.maxOrder || '',
      preparedTime: item.preparedTime || '',
      availability: item.availability === 1, // Convert availability to boolean
      status: item.status || '', // Default value if not present
      isSpecial: item.isSpecial === 1, // Convert isSpecial to boolean
      price: item.price || '',
      discount: item.discount || '',
    };
  };

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: `Menu item created successfully.`,
      });
    },
    onError: submitError => {
      handleError(submitError);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: Any) => updateMenuById(Number(id), body),
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: `Menu item updated successfully.`,
      });
    },
    onError: submitError => {
      handleError(submitError);
    },
  });

  const handleSubmit = (data: Record<string, string | number | boolean>) => {
    const payload = {
      ...data,
      createdBy: currentUser?.id, // Pass userId as createdBy
    };

    if (isEditMode) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  if (
    isCafesLoading ||
    isMenuCategoriesLoading ||
    isMenuUnitsLoading ||
    (isEditMode && isMenuItemLoading)
  ) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl pb-4">{isEditMode ? 'Edit Menu Item' : 'Add Menu Item'}</h1>
      <Form
        fields={fields}
        defaultValues={getInitialValues(menuItem as Any)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddEditMenuItem;
