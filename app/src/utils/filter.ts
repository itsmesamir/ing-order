import { orderBy } from 'lodash'; // Ensure you have lodash or replace it with your sorting logic

import { Any } from 'types/common';

import { FilterData } from 'interface/filter';
import { Sort } from 'enum/sort';

// Define a generic type for options
interface Option {
  [key: string]: Any; // Allow any properties
}

/**
 * Maps and sorts an array of options to a format suitable for select options.
 *
 * @param {T[]} options - The array of options to be mapped and sorted.
 * @param {keyof T} [labelKey='name'] - The key of the option object to be used as the label in the output. Defaults to 'name'.
 * @param {keyof T} [valueKey='id'] - The key of the option object to be used as the value in the output. Defaults to 'id'.
 * @param {keyof T} [columns='name'] - The key of the option object to be used for sorting. Defaults to 'name'.
 * @param {(boolean | 'asc' | 'desc')[]} [orderList=['asc']] - The list of sorting orders. Defaults to ascending order.
 *
 * @returns {{ label: string; value: any }[]} - The mapped and sorted array of options in the format of { label, value }.
 *
 * @template T - The type of the option object.
 */
export const mapAndSortSelectOptions = <T extends Option>(
  options: T[],
  labelKey: keyof T = 'name' as keyof T,
  valueKey: keyof T = 'id' as keyof T,
  columns: keyof T = 'name' as keyof T,
  orderList: (boolean | 'asc' | 'desc')[] = [Sort.Asc]
): FilterData[] => {
  // Sort the options
  const sortedOptions = orderBy(
    options,
    [item => (item[columns as keyof T] as string).toLowerCase()],
    orderList
  );

  // Map the sorted options to the desired format
  const mappedOptions = sortedOptions.map((option: T) => ({
    label: option[labelKey],
    value: option[valueKey],
  }));

  return mappedOptions;
};
