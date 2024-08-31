/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

interface InputFieldProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  label?: string;
  value?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  shrink?: boolean;
  containerProps?: {
    className?: string;
  };
  inputClassname?: string;
  labelProps?: {
    className?: string;
  };
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const {
    label,
    value,
    type = 'text',
    error,
    containerProps,
    labelProps,
    inputRef,
    placeholder,
    shrink = false,
    inputClassname,
    ...rest
  } = props;

  return (
    <FormControl id={rest.name} isInvalid={!!error}>
      <FormLabel {...labelProps} htmlFor={rest.name}>
        {label}
      </FormLabel>
      <Input {...rest} id={rest.name} ref={ref} type={type} placeholder={placeholder} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

InputField.displayName = 'InputField';

export default InputField;
