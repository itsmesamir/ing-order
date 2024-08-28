import { debounce } from 'lodash';

import { Any } from 'types/common';

import { INPUT_DEBOUNCE_TIME } from 'constants/common';

import { interpolate } from './interpolate';

/**
 * Build a Url removing multiple slashes and trailing slash.
 *
 * @example
 * buildUrl('http://localhost:3000', 'api', 'v1', 'users', '1') // http://localhost:3000/api/v1/users/1
 * buildUrl('http://localhost:3000/', '//api/', '/v1/', '///users///', '//1////') // http://localhost:3000/api/v1/users/1
 *
 * buildUrl('google.com', 'searchText') // google.com/searchText
 * buildUrl('google.com', '/searchText') // google.com/searchText
 * buildUrl('google.com/', '/searchText') // google.com/searchText
 * buildUrl('//google.com/', '/searchText') // //google.com/searchText
 * buildUrl('https://google.com/', '/searchText') //  https://google.com/searchText
 * buildUrl('http://google.com/', '/searchText') // http://google.com/searchText
 * buildUrl("http://google.com/", "/searchText?redirectUrl=https://google.com"); // http://google.com/searchText?redirectUrl=https://google.com
 */
export function buildUrl(...routes: Array<string | URL | number>): string {
  return routes
    .join('/')
    .replace(/(https?:\/\/|^\/\/)|(\/)+/g, '$1$2') // remove double slashes
    .replace(/\/+$/, ''); // remove trailing slash
}

/**
 * Join string
 * @param {String} string
 * @returns {String}
 * @example joinStrings('Hello','world',3,10)
 * @return 'Helloworld310'
 */
export const joinStrings = (...strings: Any[]) => {
  return strings.join('');
};

/**
 * Creates a debounced function that delays invoking the provided callback
 * until after the specified delay in milliseconds has elapsed since the last
 * time the debounced function was invoked.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} [delay=300] - The number of milliseconds to delay.
 * @returns {Function} - The new debounced function.
 */
export const debounceInput = (
  callback: (...args: Any[]) => void,
  delay: number = INPUT_DEBOUNCE_TIME
): ((...args: Any[]) => void) => {
  return debounce(callback, delay);
};
