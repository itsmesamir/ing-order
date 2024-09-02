import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function Checkbox(props: CheckboxProps) {
  const { id, label, checked, onChange, disabled } = props;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="shrink-0 mt-0.5 border-grey-200 rounded text-primary-600 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-grey-800 dark:border-grey-700 dark:checked:bg-primary-500 dark:checked:border-primary-500 dark:focus:ring-offset-grey-800"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} className="text-sm text-grey-500 ms-3 dark:text-grey-400">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
