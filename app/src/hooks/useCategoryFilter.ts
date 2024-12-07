import { useState, useEffect } from 'react';

import { useMenusQuery } from 'hooks/useMenusQuery';

import { MenuItem } from 'types/common';

export function useCategoryFilter() {
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  const { data, isLoading } = useMenusQuery({});

  const fetchUniqueCategories = () => {
    if (data) {
      const categories = Array.from(
        new Set(data.data.filter(item => item.category).map(item => item.category!.name))
      );
      setUniqueCategories(categories);
    }
  };

  const applyFilter = (category: string | null) => {
    setFilter(category);
    if (category) {
      const filtered = data?.data.filter(item => item.category?.name === category);
      setFilteredMenuItems(filtered || []);
    } else {
      setFilteredMenuItems(data?.data || []);
    }
  };

  useEffect(() => {
    if (!filter) {
      setFilteredMenuItems(data?.data || []);
    }
  }, [data, filter]);

  return {
    uniqueCategories,
    filteredMenuItems,
    isLoading,
    fetchUniqueCategories,
    applyFilter,
  };
}
