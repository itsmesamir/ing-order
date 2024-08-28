import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, FormControl, FormLabel, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

type Option = {
  label: string;
  value: string | number | boolean;
};

export type FormInputField = {
  label: string;
  type: 'text' | 'select' | 'number' | 'boolean';
  options?: Option[];
  initialValue?: string | number | boolean;
  name: string;
  value?: string | number | boolean;
  disabled?: boolean;
};

type FormProps = {
  fields: FormInputField[];
  defaultValues?: Record<string, string | number | boolean>;
  onSubmit: (formData: Record<string, string | number | boolean>) => void;
};

function Form({ fields, defaultValues = {}, onSubmit }: FormProps) {
  const history = useHistory(); // Using useHistory to manage navigation
  const { control, handleSubmit } = useForm<Record<string, string | number | boolean>>({
    defaultValues,
  });

  const handleValue = (value: string | number | boolean | undefined): string => {
    if (value === true || value === 1) {
      return 'true';
    }
    if (value === false || value === 0) {
      return 'false';
    }
    return value !== undefined ? value.toString() : '';
  };

  const onSubmitHandler = (data: Record<string, string | number | boolean>) => {
    onSubmit(data);
    history.goBack(); // Navigate back after successful submission
  };

  const handleCancel = () => {
    history.goBack(); // Navigate back when "Cancel" is clicked
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {fields.map((field, index) => {
        const fieldName = field.name || field.label;

        return (
          <FormControl key={index} mb={4} isDisabled={field.disabled}>
            <FormLabel htmlFor={fieldName}>{field.label}</FormLabel>
            <Controller
              name={fieldName}
              control={control}
              render={({ field: { onChange, value } }) => {
                const processedValue = handleValue(value);
                switch (field.type) {
                  case 'text':
                    return (
                      <Input
                        id={fieldName}
                        type="text"
                        value={(processedValue as string) || ''}
                        onChange={e => onChange(e.target.value)}
                        isDisabled={field.disabled}
                      />
                    );
                  case 'number':
                    return (
                      <Input
                        id={fieldName}
                        type="number"
                        value={processedValue !== '' ? Number(processedValue) : ''}
                        onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : '')}
                        isDisabled={field.disabled}
                      />
                    );
                  case 'select':
                    return (
                      <Select
                        id={fieldName}
                        value={processedValue}
                        onChange={e => {
                          const selectedValue = e.target.value;
                          if (field.type === 'boolean') {
                            onChange(selectedValue === 'true');
                          } else if (selectedValue === 'true' || selectedValue === 'false') {
                            onChange(selectedValue === 'true' ? 1 : 0);
                          } else {
                            onChange(selectedValue);
                          }
                        }}
                        isDisabled={field.disabled}
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option, idx) => (
                          <option key={idx} value={option.value.toString()}>
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
                        isDisabled={field.disabled}
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
      })}
      <Button type="submit" colorScheme="orange">
        Submit
      </Button>
      <Button type="button" colorScheme="red" ml={4} onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
  );
}

export default Form;
