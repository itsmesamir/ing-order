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

import { Any, MenuItem, OrderStatusEnum } from 'types/common';

import { MMMM_DD_YYYY_H_MM_A } from 'constants/date';
import en from 'constants/en';
import paths from 'constants/paths';
import queryKey from 'constants/queryKey';
import { FilterType } from 'enum/filter';
import { DefaultFilter, Filters } from 'interface/filter';

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
    <Box bgColor="gray.200">
      <Flex justifyContent="space-between">
        <Heading py={2} fontWeight="500">
          Order history
        </Heading>

        <TableFilters<UserOrderFilterID>
          appliedFilters={appliedFilters}
          onFilterApply={applyFilters}
          filters={filters}
          onFilterReset={resetFilters}
          canResetFilters={canResetFilters}
          isLoading={isCafesLoading}
        />

        <Select maxWidth="300px" value={filter} onChange={onChange}>
          {statusTypes.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex border="1px solid gray.400" borderRadius="10px" p={2} direction="column">
        {isOrderLoading && (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}

        {!isOrderLoading &&
          orders.map(order => {
            const totalItems = order.items.reduce((total, item) => item.quantity + total, 0);

            return (
              <Link
                passHref
                to={`/${paths.adminOrders}`}
                borderBottom="1px solid"
                borderColor="gray.200"
                _hover={{ bg: 'gray.50' }}
              >
                <Box
                  display="flex"
                  bgColor="white"
                  flexDirection="column"
                  borderRadius={10}
                  p={[0, 2, 4]}
                  my={[4, 4]}
                >
                  <Flex justifyContent="space-between">
                    <Flex flexDir="column">
                      <Heading size="sm" fontSize={20} mb={1}>
                        Order #{order.id}
                      </Heading>
                      <Text fontSize={['sm', 'md']} color="#757575" mb={3}>
                        {getFormattedDate(order.createdAt, MMMM_DD_YYYY_H_MM_A)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="4">
                      {order.items.map((item, index) => {
                        if (!item || !item?.menu) {
                          return null;
                        }

                        const { name, imageUrl } = item?.menu as MenuItem;

                        return (
                          <Flex key={item.id} flexDir="row" m={2} align="center">
                            <Image
                              src={imageUrl || defaultImageUrl}
                              alt={name}
                              objectFit="cover"
                              h="34px"
                              w="44px"
                              mr="10px"
                            />
                            <Flex flexDir="column" flex="1">
                              <Heading size="sm">{name}</Heading>
                              <Flex gap={10}>
                                <Text fontSize="sm" fontWeight="500">
                                  x{item.quantity}
                                </Text>
                                <Text fontSize="sm" fontWeight="700">
                                  Rs {item.price}
                                </Text>
                              </Flex>
                            </Flex>
                            {index < order.items.length - 1 && (
                              <Box borderLeft="1px" borderColor="gray.200" height="34px" ml={34} />
                            )}
                          </Flex>
                        );
                      })}
                    </SimpleGrid>
                  </Flex>

                  <Flex justifyContent="space-between" w="full" bgColor="#F6E7E3" p="2">
                    <Flex alignItems="center">
                      <Box>Delivery Time:</Box>
                      <Heading size="sm" ml={2}>
                        25 min
                      </Heading>
                    </Flex>
                    <Flex alignItems="center">
                      <Box>Distance:</Box>
                      <Heading size="sm" ml={2}>
                        3 km
                      </Heading>
                    </Flex>
                    <Flex alignItems="center">
                      <Flex>x{totalItems} items</Flex>
                      <Heading size="md" ml={2}>
                        Rs {order.totalPrice}
                      </Heading>
                    </Flex>
                  </Flex>
                  <Flex flexDir="row" my={2} justifyContent="flex-end">
                    <StatusButton status={order.status} />
                  </Flex>
                </Box>
              </Link>
            );
          })}
      </Flex>
    </Box>
  );
}

export default UserOrders;
