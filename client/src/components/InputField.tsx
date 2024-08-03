import React from 'react';
import classNames from 'classnames';

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

  const asteriskClasses = classNames();

  const labelClasses = classNames('block text-sm font-medium leading-6 text-gray-900');

  const errorClasses = classNames('text-red-600');

  const containerClasses = classNames('my-2');

  const inputClasses = classNames(
    'block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
    {
      'w-full': !shrink,
      'border-red-600 focus-visible:outline-red-600': error,
    },
    inputClassname
  );

  return (
    <div {...containerProps} className={containerClasses}>
      {label && (
        <label {...labelProps} htmlFor={rest.name} className={labelClasses}>
          {label} {rest.required ? <span className={asteriskClasses}>*</span> : ''}
        </label>
      )}

      <input
        {...rest}
        id={rest.name}
        className={inputClasses}
        ref={ref || inputRef}
        type={type}
        placeholder={placeholder}
      />
      {error && <div className={errorClasses}>{error}</div>}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
