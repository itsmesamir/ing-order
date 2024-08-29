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
        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
