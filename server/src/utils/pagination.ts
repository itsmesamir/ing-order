import { Meta, PageParams } from '@/types/pagination';

const DEFAULT_PAGE_SIZE_LIMIT = 10;

/**
 * Builds pagination parameter.
 *
 * @param {object} params
 * @returns {PaginationParams}
 */
export function buildPageParams(pageNumber?: number, size?: number) {
  const page = pageNumber || 1;
  const pageSize = size || DEFAULT_PAGE_SIZE_LIMIT;

  return {
    page,
    size: pageSize,
  };
}

export function getMeta(pageParams: PageParams, count: number): Meta {
  return {
    page: pageParams.page,
    pageSize: pageParams.size,
    total: count,
  };
}
