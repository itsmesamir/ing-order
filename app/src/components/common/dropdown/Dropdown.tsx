import Select, {
  GroupBase,
  MultiValue,
  SingleValue,
  MenuPosition,
  MenuPlacement,
  OptionsOrGroups,
  StylesConfig,
} from 'react-select';
import React from 'react';

import { classNames } from 'utils/className';

import InputWrapper from '../inputWrapper';

interface DropdownProps<OptionType> {
  name: string;
  label?: string;
  value: OptionType | OptionType[];
  options: OptionType[] | OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  onDropDownChange: (e: SingleValue<OptionType> | MultiValue<OptionType>) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  onInputChange?: (e: string) => void;
  defaultValue?: OptionType;
  isLoading?: boolean;
  maxMenuHeight?: number;
  noOptionsMessage?: () => string;
  isDisabled?: boolean;
  isMulti?: boolean;
  filterOption?: () => boolean;
  menuPlacement?: MenuPlacement;
  menuPosition?: MenuPosition;
  isClearable?: boolean;
  controlShouldRenderValue?: boolean;
  formatGroupLabel?: (group: GroupBase<OptionType>) => React.ReactNode;
  formatOptionLabel?: (data: OptionType) => React.ReactNode;
  className?: string;
  labelInfoPrefix?: string;
  isSearchable?: boolean;
  inputWrapperClassName?: string;
  customStyles?: StylesConfig<OptionType, boolean, GroupBase<OptionType>>;
}

function Dropdown<OptionType>(props: DropdownProps<OptionType>) {
  const {
    name,
    label,
    error,
    isRequired,
    value,
    options,
    onDropDownChange,
    placeholder,
    onInputChange,
    defaultValue,
    isLoading,
    maxMenuHeight,
    noOptionsMessage,
    isDisabled = false,
    isMulti = false,
    filterOption,
    menuPlacement = 'auto',
    menuPosition = 'absolute',
    isClearable = false,
    controlShouldRenderValue = true,
    formatGroupLabel,
    formatOptionLabel,
    className,
    customStyles,
    labelInfoPrefix,
    isSearchable = false,
    inputWrapperClassName,
  } = props;

  const handleDropDownChange = (e: SingleValue<OptionType> | MultiValue<OptionType>) => {
    onDropDownChange(e);
  };

  return (
    <InputWrapper
      label={label}
      error={error}
      isRequired={isRequired}
      labelInfoPrefix={labelInfoPrefix}
      className={inputWrapperClassName}
    >
      <Select
        name={name}
        classNamePrefix="lf-select"
        className={classNames(className)}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isLoading={isLoading}
        maxMenuHeight={maxMenuHeight || 250}
        menuPlacement={menuPlacement}
        noOptionsMessage={noOptionsMessage}
        menuPortalTarget={document.body}
        menuPosition={menuPosition}
        onChange={handleDropDownChange}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        value={value}
        isMulti={isMulti}
        filterOption={filterOption}
        isClearable={isClearable}
        controlShouldRenderValue={controlShouldRenderValue}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        isSearchable={isSearchable}
        styles={
          customStyles || {
            control: base => ({
              ...base,
              boxShadow: 'none',
              borderRadius: '2px',
              height: '32px',
              minHeight: '32px',
              borderColor: error ? '#ef5350' : '#d2d2d2',
              cursor: 'pointer',
            }),
            placeholder: base => ({
              ...base,
              fontSize: '14px',
              color: '#B2B2B2',
            }),
            dropdownIndicator: base => ({
              ...base,
              padding: '0px 8px',
            }),
            indicatorSeparator: base => ({
              ...base,
              display: 'none',
            }),
            menuList: base => ({
              ...base,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }),
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            option: (base, { isSelected }) => ({
              ...base,
              backgroundColor: isSelected ? '#2684ff' : 'white',
              '&:hover': {
                backgroundColor: isSelected ? '#2684ff' : '#DEEBFF',
              },
            }),
          }
        }
      />
    </InputWrapper>
  );
}

export default Dropdown;
