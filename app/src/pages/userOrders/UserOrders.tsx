import { Flex } from '@chakra-ui/layout';
import {
  Box,
  Button,
  Heading,
  Image,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { fetchOrders } from 'services/oders';

import Link from 'components/Link';
import TableFilters from 'components/table/components/TableFilter';

import { useCafesQuery } from 'hooks/useCafesQuery';
import useFilters from 'hooks/useFilter';
import { useMenusQuery } from 'hooks/useMenusQuery';

import { getFormattedDate } from 'utils/date';
import { mapAndSortSelectOptions } from 'utils/filter';
import { parseQuery } from 'utils/queryParams';

import { Any, MenuItem, Order, OrderStatusEnum } from 'types/common';

import { MMMM_DD_YYYY_H_MM_A } from 'constants/date';
import en from 'constants/en';
import paths from 'constants/paths';
import queryKey from 'constants/queryKey';
import { FilterType } from 'enum/filter';
import { DefaultFilter, Filters } from 'interface/filter';

import OrderList from './OrderLIst';

const statusTypes = [
  { id: '', name: 'Any' },
  { id: 'Pending', name: 'Pending' },
  { id: 'Completed', name: 'Completed' },
  { id: 'Failed', name: 'Failed' },
];

function StatusButton({ status }: { status: OrderStatusEnum }) {
  return <Button w={40}>{status}</Button>;
}

// type UserOrderFilterID = 'cafeIds' | 'date';
enum UserOrderFilterID {
  cafeIds = 'cafeIds',
  menuIds = 'menuIds',
  date = 'date',
  status = 'status',
}

const DEFAULT_FILTERS: DefaultFilter<UserOrderFilterID> = {
  cafeIds: null,
  date: null,
  menuIds: null,
  status: null,
};

function UserOrders() {
  const [filter, setFilter] = useState(statusTypes[0].id);

  const { data: cafes, isLoading: isCafesLoading } = useCafesQuery({});

  const { data: menuItemsData, isLoading: isMenuItemLoading } = useMenusQuery();

  const menuItems = menuItemsData?.data;

  const cafeOptions = mapAndSortSelectOptions(cafes || [], 'name', 'id');

  const menuItemsOptions = mapAndSortSelectOptions(menuItems || [], 'name', 'id');

  const statusOptions = mapAndSortSelectOptions(statusTypes || [], 'name', 'id');

  const filters: Filters<UserOrderFilterID>[] = useMemo(
    () => [
      {
        name: en.CAFE,
        key: UserOrderFilterID.cafeIds,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: true,
        options: cafeOptions,
      },
      {
        name: en.MENU,
        key: UserOrderFilterID.menuIds,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: true,
        options: menuItemsOptions,
      },
      {
        name: en.GENERAL.STATUS,
        key: UserOrderFilterID.status,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: true,
        options: statusOptions,
      },
      {
        name: en.GENERAL.DATE,
        key: UserOrderFilterID.date,
        isFixed: true,
        type: FilterType.Date,
      },
    ],
    [cafeOptions, menuItemsOptions, statusOptions]
  );

  const { appliedFilters, applyFilters, resetFilters, canResetFilters } =
    useFilters(DEFAULT_FILTERS);

  const params = parseQuery(window.location.search);

  const { data: orders, isLoading } = useQuery({
    queryKey: [queryKey.orders, filter, params],
    queryFn: ({ signal }: Any) => fetchOrders(params, signal),
    enabled: true,
  });

  const defaultImageUrl =
    'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg';

  const isOrderLoading = !orders || isLoading;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="bg-grey-100 h-full">
      <div className="flex justify-between items-center p-4">
        <p className="text-2xl font-bold text-nowrap">Order history</p>

        <TableFilters<UserOrderFilterID>
          appliedFilters={appliedFilters}
          onFilterApply={applyFilters}
          filters={filters}
          onFilterReset={resetFilters}
          canResetFilters={canResetFilters}
          isLoading={isCafesLoading}
        />
      </div>

      <Flex border="1px solid gray.400" borderRadius="10px" p={4} direction="column">
        {isOrderLoading && (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}

        {!isOrderLoading && <OrderList orders={orders as Order[]} />}
      </Flex>
    </div>
  );
}

export default UserOrders;
