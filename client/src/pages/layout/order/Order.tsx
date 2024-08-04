import {
  Box,
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import useCartStore from 'stores/useCartStore';

import ItemCounter from 'components/ItemCounter';

import en from 'constants/en';

const paymentSummary = [
  {
    title: 'Sub Total',
    value: 100,
  },
  {
    title: 'Tax',
    value: 140,
  },
  {
    title: 'Total pay',
    value: 140,
  },
];

function Order() {
  const { items: carts, getSummary } = useCartStore();

  const summary = useMemo(() => getSummary(carts), [carts]);

  const [count, setCount] = useState(1);

  return (
    <Box overflow="auto" height="100%">
      <div className="p-6 bg-white rounded-lg overflow-auto h-100">
        <Text>My Orders</Text>
        <div className="flex flex-col">
          {carts.map(cart => (
            <div className="border-b border-white first:pt-0 py-4">
              <Image
                boxSize="68px"
                objectFit="cover"
                src={cart.item?.imageUrl}
                alt={cart.item?.name}
                className="rounded-lg"
              />
              <p className="text-base font-semibold">{cart.item?.name}</p>
              <ItemCounter quantity={cart.quantity} setCount={setCount} />
              <div className="flex ml-4">
                <p className="text-lg font-semibold">
                  {en.ORDER.CURRENCY}
                  {cart.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div>
          <Text fontSize={{ base: '2xl', md: '3xl' }}>{en.ORDER.PAYMENT_SUMMARY}</Text>
        </div>

        <TableContainer>
          <Table size="sm">
            {/* <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
            </Tr>
          </Thead> */}

            <Tbody>
              {paymentSummary.map(item => (
                <Tr>
                  <Td fontSize={{ base: 'large' }} fontWeight="semibold" className="mx-0 py-4">
                    {item.title}
                  </Td>
                  <Td fontSize={{ base: 'large' }}>{item.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <div className="w-100 mt-6 center">
          <Button colorScheme="orange" className="w-100">
            Place Order
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default Order;
