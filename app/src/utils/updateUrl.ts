import queryString from 'query-string';

import { Any } from 'types/common';

import history from './history';

/**
 * Updates the URL with new query parameters.
 *
 * @param value - An object representing the new query parameters.
 */
export const updateUrl = (value: Record<string, Any>): void => {
  const currentParams = queryString.parse(history.location.search);
  const newParams = { ...currentParams, ...value };

  // Remove keys with `undefined` values
  Object.keys(newParams).forEach(key => {
    if (newParams[key] === undefined) {
      delete newParams[key];
    }
  });

  const updatedSearch = queryString.stringify(newParams);
  history.push({ search: updatedSearch });
};

/**
 * Sets the search parameters based on the provided object.
 *
 * @param value - An object containing the search parameters to set.
 */
export const setSearchParamsFromObject = (value: Record<string, any>): void => {
  const currentParams = queryString.parse(history.location.search);
  const newParams = { ...currentParams, ...value };

  // Remove keys with `undefined` values
  Object.keys(newParams).forEach(key => {
    if (newParams[key] === undefined) {
      delete newParams[key];
    }
  });

  const updatedSearch = queryString.stringify(newParams);
  history.push({ search: updatedSearch });
};

/**
 * Gets a search parameter by key.
 *
 * @param key - The key of the search parameter to retrieve.
 * @returns The value of the search parameter or null if not found.
 */
export const getSearchParam = (key: string): string | null => {
  const searchParams = queryString.parse(history.location.search);
  return searchParams[key] || null;
};

/**
 * Sets a specific search parameter.
 *
 * @param key - The key of the search parameter.
 * @param value - The value to set for the search parameter.
 */
export const setSearchParam = (key: string, value: string): void => {
  const searchParams = queryString.parse(history.location.search);
  searchParams[key] = value;

  const updatedSearch = queryString.stringify(searchParams);
  history.push({ search: updatedSearch });
};

/**
 * Removes a specific search parameter.
 *
 * @param key - The key of the search parameter to remove.
 */
export const removeSearchParam = (key: string): void => {
  const searchParams = queryString.parse(history.location.search);
  delete searchParams[key];

  const updatedSearch = queryString.stringify(searchParams);
  history.push({ search: updatedSearch });
};

/**
 * Clears all search parameters.
 */
export const clearSearchParams = (): void => {
  history.push({ search: '' });
};
