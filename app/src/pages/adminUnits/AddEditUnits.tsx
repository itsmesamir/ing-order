import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { createMenuUnits, updateMenuUnits } from 'services/menus';

import useUserStore from 'stores/useUserStore';

import Form, { FormInputField } from 'components/Form';

import { useMenuUnitsQuery } from 'hooks/useMenuUnitsQuery';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

interface MenuUnit {
  name?: string;
  symbol?: string;
}

function AddEditUnits() {
  const { id } = useParams<{ id?: string }>();
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;
  const { data: currentUser } = useUserStore();

  // Fetch menu units data
  const { data: menuUnits, isLoading: isMenuUnitsLoading } = useMenuUnitsQuery({});

  // If id exists, find the specific unit from the menuUnits list
  const unit = isEditMode ? menuUnits?.find(unit => unit.id === Number(id)) : undefined;

  const fields: FormInputField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'symbol', label: 'Symbol', type: 'text' },
  ];

  // Function to filter and format the unit data
  const getInitialValues = (unit: MenuUnit = {}): Record<string, string> => {
    return {
      name: unit.name || '',
      symbol: unit.symbol || '',
    };
  };

  const createMutation = useMutation({
    mutationFn: createMenuUnits,
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: 'Unit created successfully.',
      });
    },
    onError: submitError => {
      handleError(submitError);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, string | number | boolean>) =>
      updateMenuUnits(Number(id), data),
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: 'Unit updated successfully.',
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

  if (isMenuUnitsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl pb-4">{isEditMode ? 'Edit Unit' : 'Add Unit'}</h1>
      <Form
        fields={fields}
        defaultValues={isEditMode ? getInitialValues(unit) : undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddEditUnits;
