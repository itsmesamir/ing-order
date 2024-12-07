import { FieldValues, UseFormSetValue } from 'react-hook-form';

export const removeFalseValue = (object: object) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!value) {
      return { ...acc };
    }

    return { ...acc, [key]: value };
  }, {});
};

/**
 * Get name and value from key and value
 * Only use to edit form with react-hook-form
 */
export const getNameAndValue = (object: object, state: UseFormSetValue<FieldValues>) => {
  Object.entries(object).map(([name, value]) => state(name, value));
};
