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

import * as orderServices from 'services/oders';

import useCartStore from 'stores/useCartStore';
import useUserStore from 'stores/useUserStore';

import Loading from 'components/common/Loading';
import ItemCounter from 'components/ItemCounter';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

import { CartItem, MenuItem } from 'types/common';

import en from 'constants/en';

// TODO: susmita Use from the order
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
  const { data: currentUser } = useUserStore();
  const [submitting, setSubmitting] = useState(false);

  const { items: carts, getSummary, addItem, updateItemCount, clearCart } = useCartStore();

  const mapSummaryToPayload = (cart: CartItem[]) => {
    return {
      user: { id: currentUser?.id },
      menu_items: cart.map(item => ({
        id: item?.menu?.id,
        cafeId: item.menu?.cafeId,
        quantity: item.quantity,
        price: Number(item.price),
        discount: Number(item.discount),
      })),
    };
  };
  const payload = useMemo(() => mapSummaryToPayload(carts), [carts]);

  const summary = useMemo(() => getSummary(carts), [carts]);

  const [count, setCount] = useState(1);

  const handlePlaceOrder = async () => {
    if (carts.length === 0) {
      toast.error({
        title: 'Error',
        message: 'Your cart is empty. Please add items to the cart before placing an order.',
      });

      return;
    }

    setSubmitting(true);

    try {
      // if (order) {
      //   await orderServices.updateOrderById(order.id, payload);
      // } else {
      await orderServices.createOrder(payload);
      // }

      toast.success({
        title: 'Success',
        message: `Order created successfully.`,
        // message: order ? `Order updated successfully.` : `Order created successfully.`,
      });

      clearCart();
    } catch (err) {
      handleError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box overflow="auto" height="100%">
      <div className="p-6 bg-white rounded-lg overflow-auto h-100">
        <Text>My Orders</Text>
        <div className="flex flex-col">
          {carts.map(cart => {
            const menu = cart.menu as MenuItem;

            return (
              <div className="border-b border-white first:pt-0 py-4">
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src={cart.menu?.imageUrl}
                  alt="Dan Abramov"
                  className="rounded-lg"
                />
                <div className="ml-4">
                  <p className="text-base font-semibold">{cart.menu?.name}</p>
                  <ItemCounter
                    count={cart.quantity}
                    handleCount={newCount => updateItemCount(cart.menu?.id as number, newCount)}
                  />
                  <div className="flex ml-4">
                    <p className="text-lg font-semibold">
                      {en.ORDER.CURRENCY}
                      {cart.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
          <Button colorScheme="orange" className="w-100" onClick={handlePlaceOrder}>
            {submitting ? <Loading /> : 'Place Order'}
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default Order;
