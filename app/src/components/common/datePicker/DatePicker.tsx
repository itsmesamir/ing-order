import React from 'react';
import DatePickerPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the props interface for the DatePicker component
interface DatePickerProps {
  selectedDate?: Date; // The selected date
  onChange?: (date: Date | null) => void; // Callback when date changes
  placeholderText?: string; // Placeholder text
  dateFormat?: string; // Format of the displayed date
  isClearable?: boolean; // Allow clearing the date
  showYearDropdown?: boolean; // Show year dropdown
  showMonthDropdown?: boolean; // Show month dropdown
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
  disabled?: boolean; // Disable the date picker
  required?: boolean; // Make the date picker required
  className?: string; // Custom class name for styling
}

// The DatePicker component
function DatePicker({
  selectedDate,
  onChange,
  placeholderText,
  dateFormat = 'yyyy/MM/dd',
  isClearable = false,
  showYearDropdown = false,
  showMonthDropdown = false,
  minDate,
  maxDate,
  disabled = false,
  required = false,
  className,
}: DatePickerProps) {
  // Handle date change event
  const handleChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <DatePickerPicker
      selected={selectedDate}
      onChange={handleChange}
      placeholderText={placeholderText}
      dateFormat={dateFormat}
      isClearable={isClearable}
      showYearDropdown={showYearDropdown}
      showMonthDropdown={showMonthDropdown}
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled}
      required={required}
      className={className}
    />
  );
}

export default DatePicker;
