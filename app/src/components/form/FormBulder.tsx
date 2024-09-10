import { Controller, Control } from 'react-hook-form';
import { Input, Select, FormControl, FormLabel } from '@chakra-ui/react';

import { Any } from 'types/common';

type Option = {
  label: string;
  value: string | number | boolean;
};

export type FormInputField = {
  label: string;
  type: 'text' | 'select' | 'number' | 'boolean';
  name: string;
  options?: Option[];
  disabled?: boolean;
  control?: Control<Any>;
};

function FormBulder(props: FormInputField) {
  const { label, type, name, options, control, disabled } = props;

  const fieldName = name || label;

  const handleValue = (_value: string | number | boolean | undefined): string => {
    if (_value === true || _value === 1) {
      return 'true';
    }

    if (_value === false || _value === 0) {
      return 'false';
    }

    return _value !== undefined ? _value.toString() : '';
  };

  return (
    <FormControl key={name} mb={4} isDisabled={disabled}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange, value } }) => {
          const processedValue = value;

          switch (type) {
            case 'text':
              return (
                <Input
                  id={fieldName}
                  type="text"
                  value={(processedValue as string) || ''}
                  onChange={e => onChange(e.target.value)}
                  isDisabled={disabled}
                />
              );

            case 'number':
              return (
                <Input
                  id={fieldName}
                  type="number"
                  value={processedValue !== '' ? Number(processedValue) : ''}
                  onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : '')}
                  isDisabled={disabled}
                />
              );

            case 'select':
              return (
                <Select
                  id={fieldName}
                  value={processedValue}
                  onChange={e => {
                    const selectedValue = e.target.value;

                    onChange(selectedValue);
                  }}
                  isDisabled={disabled}
                >
                  <option value="">Select an option</option>
                  {options?.map(option => (
                    <option key={option.value.toString()} value={option.value.toString()}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              );

            case 'boolean':
              return (
                <Select
                  id={fieldName}
                  value={processedValue}
                  onChange={e => onChange(e.target.value === 'true' ? 1 : 0)}
                  isDisabled={disabled}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select>
              );

            default:
              return <div />;
          }
        }}
      />
    </FormControl>
  );
}

export default FormBulder;
