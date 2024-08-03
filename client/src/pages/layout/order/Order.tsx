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

const orderedItems = [
  {
    name: 'Item 1',
    imageSrc:
      'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 100,
  },
  {
    name: 'Item 2',
    imageSrc:
      'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 100,
  },
];

function Order() {
  return (
    <div className="p-6 bg-slate-200">
      {/* Ordered Items */}

      <div className="flex flex-col">
        {orderedItems.map(item => (
          <div className="flex border-b border-white first:pt-0 py-4">
            <Image
              boxSize="50px"
              objectFit="cover"
              src={item.imageSrc}
              alt="Dan Abramov"
              className="rounded-lg"
            />
            <div className="ml-4">
              <p className="text-base font-semibold">{item.name}</p>
              <p className="text-lg font-semibold">
                {en.ORDER.CURRENTY}
                {item.price}
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
  );
}

export default Order;
