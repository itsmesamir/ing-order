import React from 'react';

import { classNames } from 'utils/className';

interface InputProps {
  name: string;
  value: string | number;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  isRequired?: boolean;
  isDisabled?: boolean;
  prefixText?: string | number;
  suffixText?: string | number;
  className?: string;
  info?: number;
  inputWrapperClass?: string;
}

function Input(props: InputProps) {
  const {
    name,
    value,
    label,
    error,
    placeholder,
    isRequired = false,
    onChange,
    inputRef,
    type = 'text',
    isDisabled = false,
    prefixText,
    suffixText,
    className,
    info,
    inputWrapperClass,
  } = props;

  return (
    <input
      className={classNames(
        'h-8 w-full rounded-sm border border-solid border-grey-20 p-2 outline-none placeholder:text-sm placeholder:text-grey-40 focus:border-tertiary-primary-50',
        {
          'border-error-base': error,
          'rounded-tr-none rounded-br-none': suffixText,
          'pl-6': prefixText,
          'pr-[50px]': info,
        },
        className
      )}
      name={name}
      type={type}
      value={value}
      ref={inputRef}
      onChange={onChange}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  );
}

export default Input;
