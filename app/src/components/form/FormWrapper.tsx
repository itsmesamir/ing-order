import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

interface FormWrapperProps {
  error?: {
    message: string;
  };
  id: string;
  label: string;
  children: React.ReactNode | React.ReactNode[];
}

function FormWrapper({ id, error, label, children }: FormWrapperProps) {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>

      {children && children}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default FormWrapper;
