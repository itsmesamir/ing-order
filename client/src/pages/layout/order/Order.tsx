import {
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
import { useMemo } from 'react';

import useCartStore from 'stores/useCartStore';

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

  return (
    <div className="p-6 bg-slate-200">
      {/* Ordered Items */}

      <div className="flex flex-col">
        {carts.map(cart => (
          <div className="flex border-b border-white first:pt-0 py-4">
            <Image
              boxSize="50px"
              objectFit="cover"
              src={cart.item?.imageUrl}
              alt="Dan Abramov"
              className="rounded-lg"
            />
            <div className="ml-4">
              <p className="text-base font-semibold">{cart.item?.name}</p>
              <p className="text-lg font-semibold">
                {en.ORDER.CURRENTY}
                {cart.price}
              </p>
              <p>{cart.quantity}</p>
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
  );
}

export default Order;
