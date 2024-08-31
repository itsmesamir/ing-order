import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { createMenuItem, updateMenuById } from 'services/menus';

import useUserStore from 'stores/useUserStore';

import Form, { FormInputField } from 'components/Form';

import { useCafesQuery } from 'hooks/useCafesQuery';
import { useMenuUnitsQuery } from 'hooks/useMenuUnitsQuery';
import { useMenuByIdQuery } from 'hooks/useMenuByIdQuery';
import { useMenuCategoriesQuery } from 'hooks/useMenuCategoriesQuery';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

import { Any } from 'types/common';

function AddEditMenuItem() {
  const { id: menuItemId } = useParams<{ id?: string }>();

  const isEditMode = !!menuItemId;

  const { data: menuCategories, isLoading: isMenuCategoriesLoading } = useMenuCategoriesQuery({});
  const { data: cafes, isLoading: isCafesLoading } = useCafesQuery({});
  const { data: menuUnits, isLoading: isMenuUnitsLoading } = useMenuUnitsQuery({});
  const { data: menuItem, isLoading: isMenuItemLoading } = useMenuByIdQuery(
    menuItemId as unknown as number
  );

  const { data: currentUser } = useUserStore();

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

  const getInitialValues = (item: Any = {}): Record<string, string | number | boolean> => {
    return {
      name: item.name || '',
      categoryId: item.category?.id || '',
      unitId: item.unit?.id || '',
      cafeId: item.cafe?.id || '',
      description: item.description || '',
      maxOrder: item.maxOrder || '',
      preparedTime: item.preparedTime || '',
      availability: item.availability === 1,
      status: item.status || '',
      isSpecial: item.isSpecial === 1,
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
    mutationFn: (body: Any) => updateMenuById(Number(menuItemId), body),
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
      createdBy: currentUser?.id,
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
