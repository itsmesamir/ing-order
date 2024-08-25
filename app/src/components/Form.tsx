import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, FormControl, FormLabel, Box } from '@chakra-ui/react';

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
};

type FormProps = {
  fields: FormInputField[];
  defaultValues?: Record<string, string | number | boolean>;
  onSubmit: (formData: Record<string, string | number | boolean>) => void;
};

function Form({ fields, defaultValues = {}, onSubmit }: FormProps) {
  const { control, handleSubmit } = useForm<Record<string, string | number | boolean>>({
    defaultValues,
  });

  const onSubmitHandler = (data: Record<string, string | number | boolean>) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {fields.map((field, index) => {
        const fieldName = field.name || field.label;

        console.log(fieldName);

        return (
          <FormControl key={index} mb={4}>
            <FormLabel htmlFor={fieldName}>{field.label}</FormLabel>
            <Controller
              name={fieldName}
              control={control}
              render={({ field: { onChange, value } }) => {
                switch (field.type) {
                  case 'text':
                    return (
                      <Input
                        id={fieldName}
                        type="text"
                        value={(value as string) || ''}
                        onChange={e => onChange(e.target.value)}
                      />
                    );
                  case 'number':
                    return (
                      <Input
                        id={fieldName}
                        type="number"
                        value={typeof value === 'number' ? value : ''}
                        onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : '')}
                      />
                    );
                  case 'select':
                    return (
                      <Select
                        id={fieldName}
                        value={(value as string) || ''}
                        onChange={e => onChange(e.target.value)}
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
                        value={value === true ? 'true' : 'false'}
                        onChange={e => onChange(e.target.value === 'true')}
                      >
                        {field.options?.map((option, idx) => (
                          <option key={idx} value={option.value.toString()}>
                            {option.label}
                          </option>
                        ))}
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
      <Button type="button" colorScheme="red" ml={4}>
        Cancel
      </Button>
    </Box>
  );
}

export default Form;
