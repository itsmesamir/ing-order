import { Flex } from '@chakra-ui/layout';
import { Heading, Image, SimpleGrid, Select, Box, Stack, Text, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { fetchOrders } from 'services/oders';

import Link from 'components/Link';
import MenuItemCard from 'components/MenuItemCard';

import { Any, MenuItem } from 'types/common';

import paths from 'constants/paths';
import queryKey from 'constants/queryKey';

function AdminOrders() {
  const statusTypes = [
    { id: 'Pending', name: 'Pending' },
    { id: 'Completed', name: 'Completed' },
    { id: 'Failed', name: 'Failed' },
  ];

  const { data: orders, isLoading } = useQuery({
    queryKey: [queryKey.orders],
    queryFn: ({ signal }: Any) => fetchOrders({}, signal),
    enabled: true,
  });

  if (!orders || isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading py={2} fontWeight="500">
          Order history
        </Heading>

        <Select maxWidth="300px" placeholder="Select Filter">
          {statusTypes.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex border="1px solid gray.400" borderRadius="10px" p={2} direction="column">
        {orders.map((order, index) => {
          return (
            <Link
              passHref
              href={paths.adminOrders}
              borderBottom="1px solid"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
            >
              <Box display="flex" borderRadius={10} p={[0, 2, 4]} my={[4, 4]}>
                <Flex justifyContent="space-between">
                  <Flex>
                    <Heading>Orders #123</Heading>
                    <Text fontSize={['sm', 'md']}>November, 11 2024 2:30 PM</Text>
                  </Flex>
                </Flex>

                <Flex>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="4">
                    {order.items.map((item, index) => {
                      if (!item) {
                        return null;
                      }

                      return <MenuItemCard item={item.item as MenuItem} addItem={() => null} />;
                    })}
                  </SimpleGrid>
                </Flex>

                <Flex>
                  <Flex justifyContent="space-between">
                    <Flex>x2 items</Flex>
                    <Flex> Rs 250</Flex>
                  </Flex>
                  <Button>Completed</Button>
                </Flex>
              </Box>
            </Link>
          );
        })}
      </Flex>
    </>
  );
}

export default AdminOrders;
