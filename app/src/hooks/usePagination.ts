import React, { useState } from 'react';

import { Meta } from 'interface/common';
import { DEFAULT_PAGE_SIZE } from 'constants/page';

type UsePaginationReturn = {
  pageCount: number;
  pageData: Meta;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  setPageData: React.Dispatch<React.SetStateAction<Meta>>;
  updatePageCount: (total: number, size: number) => void;
};

/**
 * Custom hook for managing pagination state and logic.
 *
 * @returns {Object} - Returns an object containing:
 *  - pageCount: Number of pages based on the total data.
 *  - pageData: Object containing pagination metadata such as total items, current page, and page size.
 *  - setPageData: Function to manually set pagination metadata.
 *  - updatePageCount: Function to update the page count based on total items and page size.
 */
function usePagination(): UsePaginationReturn {
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageData, setPageData] = useState<Meta>({
    total: 0,
    page: 0,
    pageSize: 0,
  });

  /**
   * Function to update the total number of pages based on the total items and page size.
   *
   * @param {number} total - The total number of items.
   * @param {number} size - The number of items per page.
   */
  const updatePageCount = (total: number, size: number) => {
    const totalPage = Math.ceil(total / (size || DEFAULT_PAGE_SIZE));

    setPageCount(totalPage);
  };

  // Return the page count, pagination data, and functions for managing them
  return { pageCount, setPageCount, pageData, setPageData, updatePageCount };
}

export default usePagination;
