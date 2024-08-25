import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { createMenuCategories } from 'services/menus';

import Form, { FormInputField } from 'components/Form';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

function AddCategories() {
  const [cafes, setCafes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const submitMutation = useMutation({
    mutationFn: createMenuCategories,
    onSuccess: () => {
      toast.success({
        title: 'Success',
        message: `Menu category created successfully.`,
      });
    },
    onError: submitError => {
      handleError(submitError);
    },
  });

  const fields: FormInputField[] = [{ name: 'name', label: 'Name', type: 'text' }];

  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl pb-4">Add Menu Item</h1>
      <Form fields={fields} onSubmit={submitMutation.mutate} />
    </div>
  );
}
export default AddCategories;
