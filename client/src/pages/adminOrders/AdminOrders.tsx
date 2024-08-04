import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Flex } from '@chakra-ui/layout';
import {
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Select,
  Box,
  Text,
  Button,
  Skeleton,
} from '@chakra-ui/react';

import { fetchOrders } from 'services/oders';

import Link from 'components/Link';

import { Any, MenuItem } from 'types/common';

import paths from 'constants/paths';
import queryKey from 'constants/queryKey';

const statusTypes = [
  { id: '', name: 'Any' },
  { id: 'Pending', name: 'Pending' },
  { id: 'Completed', name: 'Completed' },
  { id: 'Failed', name: 'Failed' },
];

function AdminOrders() {
  const [filter, setFilter] = useState(statusTypes[0].id);

  const { data: orders, isLoading } = useQuery({
    queryKey: [queryKey.orders, filter],
    queryFn: ({ signal }: Any) => fetchOrders(filter ? { status: filter } : {}, signal),
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
          orders.map((order, index) => {
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
                      <Heading size="md">Orders #{order.id}</Heading>
                      <Text fontSize={['sm', 'md']}>November, 11 2024 2:30 PM</Text>
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
                          <Flex flexDir="row" m={2}>
                            <Image
                              src={imageUrl || defaultImageUrl}
                              alt={name}
                              objectFit="cover"
                              h="40px"
                              w="40px"
                            />

                            <Flex flexDir="column">
                              <Heading size="md">{name}</Heading>
                              <Flex>
                                <Text>x{item.quantity}</Text>
                                <Flex> Rs {item.price}</Flex>
                              </Flex>
                            </Flex>
                          </Flex>
                        );
                      })}
                    </SimpleGrid>
                  </Flex>

                  <Flex justifyContent="space-between" w="full" bgColor="orange.300" p="2">
                    <Flex alignItems="center">
                      <Box>Dilevery Time:</Box>
                      <Heading size="sm" ml={2}>
                        25 min
                      </Heading>
                    </Flex>
                    <Flex alignItems="center">
                      <Flex>x{totalItems} items</Flex>
                      <Heading size="sm" ml={2}>
                        Rs {order.totalPrice}
                      </Heading>
                    </Flex>
                  </Flex>

                  <Flex flexDir="row" my={2} justifyContent="flex-end">
                    <Button w={40}>{order.status}</Button>
                  </Flex>
                </Box>
              </Link>
            );
          })}
      </Flex>
    </Box>
  );
}

export default AdminOrders;
