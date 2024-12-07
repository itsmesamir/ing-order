import {
  Td,
  Tr,
  Box,
  Grid,
  Text,
  Image,
  Table,
  Tbody,
  Stack,
  Radio,
  Button,
  Heading,
  IconButton,
  SimpleGrid,
  RadioGroup,
  TableContainer,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';

import * as orderServices from 'services/oders';

import useCartStore from 'stores/useCartStore';
import useUserStore from 'stores/useUserStore';

import Loading from 'components/common/Loading';
import ItemCounter from 'components/ItemCounter';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

import { CartItem, MenuItem } from 'types/common';

import en from 'constants/en';

interface CheckOutFormValues {
  orderType: string;
}

function Checkout() {
  const { data: currentUser } = useUserStore();
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CheckOutFormValues>();

  const { items: carts, summary, updateItemCount, clearCart, removeItem } = useCartStore();

  const mapSummaryToPayload = (cart: CartItem[]) => {
    const categorizedItems = cart.reduce((acc, item) => {
      const menu = item.menu as MenuItem;
      const category = menu?.category;

      if (!category) {
        return acc;
      }

      const parentCategory =
        category.parentId === null || category.parentId === undefined
          ? category.name
          : 'Uncategorized';

      if (!acc[parentCategory]) {
        acc[parentCategory] = [];
      }

      acc[parentCategory].push({
        id: menu.id,
        name: menu.name,
        cafeId: menu.cafeId,
        quantity: item.quantity,
        price: Number(item.price),
        discount: Number(item.discount),
      });

      return acc;
    }, {} as Record<string, unknown[]>);

    return {
      user: { id: currentUser?.id },
      categories: Object.entries(categorizedItems).map(([parentCategory, items]) => ({
        parentCategory,
        itemCount: items.length,
        items,
      })),
    };
  };

  const payload = useMemo(() => mapSummaryToPayload(carts), [carts]);

  const orderTypeOptions = [
    {
      label: 'Event',
      value: 'event',
    },
    { label: 'Personal', value: 'personal' },
  ];

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
      await orderServices.createOrder(payload);
      toast.success({
        title: 'Success',
        message: 'Order created successfully.',
      });

      clearCart();
    } catch (err) {
      handleError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <Box overflow="auto" height="80vh" className="bg-grey-200 p-2">
      <Box
        bg="gray.200"
        height="50px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        top="0"
        zIndex="1"
      >
        <Text fontSize="lg" fontWeight="bold">
          Checkout
        </Text>
      </Box>

      <Grid
        templateColumns={['1fr', '1fr', '1fr 300px']}
        autoRows="minmax(min-content, max-content)"
        gap={4}
      >
        <SimpleGrid className="flex-1 overflow-auto flex-col h-100" spacing={4}>
          <div className="flex bg-white  rounded-lg p-4 flex-col">
            <Text size="sm" fontSize={24} fontWeight={500} my={2}>
              My Orders
            </Text>
            {carts.map((cart: CartItem) => {
              const menu = cart.menu as MenuItem;
              const itemTotal = cart.quantity * cart.price;

              if (!menu) {
                return null;
              }

              return (
                <div
                  key={menu.id}
                  className="border-b border-white first:pt-0 py-4 flex items-center relative hover:bg-grey-100 hover:shadow-lg hover:cursor-pointer transition duration-300"
                >
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={cart.menu?.imageUrl}
                    alt="Item image"
                    className="rounded-lg"
                    display={cart.quantity === 0 ? 'none' : 'block'}
                  />

                  <IconButton
                    aria-label="Remove item"
                    icon={<FiX />}
                    position="absolute"
                    top="8px"
                    right="8px"
                    background="rgba(255, 255, 255, 0.7)"
                    color="red.500"
                    size="4xl"
                    zIndex={10}
                    onClick={() => handleRemoveItem(menu.id)}
                  />

                  <div className="ml-6 mr-6 flex-1">
                    <Text
                      fontSize="xl"
                      fontWeight="semibold"
                      display={cart.quantity === 0 ? 'none' : 'block'}
                    >
                      {cart.menu?.name}
                    </Text>

                    <ItemCounter
                      count={cart.quantity}
                      handleCount={newCount => updateItemCount(cart.menu?.id as number, newCount)}
                    />

                    <div className="flex justify-between mt-4">
                      <Text fontSize="lg" fontWeight="semibold">
                        {en.ORDER.CURRENCY}
                        {cart.price}
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold">
                        Total: {en.ORDER.CURRENCY}
                        {itemTotal}
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Box className="p-4 h-min bg-white rounded-lg">
            <Heading size="md">Order Type</Heading>
            <Controller
              name="orderType"
              control={control}
              defaultValue="event"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack spacing={5} direction="row">
                    {orderTypeOptions.map(({ label, value }) => {
                      return (
                        <Radio colorScheme="primary" value={value}>
                          {label}
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              )}
            />

            {isDirty && errors.orderType && (
              <p className="mt-1 flex justify-start px-4 pb-2 pl-0 text-xs text-error-base">
                {errors.orderType.message}
              </p>
            )}
          </Box>
        </SimpleGrid>

        <Box
          className="p-4 bg-white rounded-lg"
          position="absolute"
          right="9"
          width="300px"
          height="65vh"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <Box className="p-4 bg-white rounded-lg">
            <Heading size="md" mb={4}>
              Categories Summary
            </Heading>
            {payload.categories.map((category, index) => (
              <Box key={index} borderBottom="1px solid" borderColor="gray.200" py={2}>
                <Text fontSize="lg" fontWeight="bold">
                  {category.parentCategory}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Items: {category.itemCount}
                </Text>
                <Box pl={4} mt={2} />
              </Box>
            ))}
          </Box>
          <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center" color="gray.600">
            {en.ORDER.PAYMENT_SUMMARY}
          </Text>
          <TableContainer>
            <Table size="sm" variant="simple">
              <Tbody>
                <Tr>
                  <Td fontSize="lg" fontWeight="medium" py={2} color="gray.500">
                    Sub Total
                  </Td>
                  <Td fontSize="lg" textAlign="right" py={2} color="gray.700">
                    {summary.subTotal}
                  </Td>
                </Tr>
                <Tr>
                  <Td fontSize="lg" fontWeight="medium" py={2} color="gray.500">
                    Tax
                  </Td>
                  <Td fontSize="lg" textAlign="right" py={2} color="gray.700">
                    {summary.tax}
                  </Td>
                </Tr>
                <Tr borderTop="2px solid" borderColor="gray.200">
                  <Td fontSize="lg" fontWeight="bold" py={2} color="gray.700">
                    Total
                  </Td>
                  <Td fontSize="lg" textAlign="right" py={2} color="orange.500">
                    {summary.total}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Box mt={6} display="flex" justifyContent="center">
            <Button
              colorScheme="orange"
              width="full"
              size="lg"
              isLoading={submitting}
              onClick={handleSubmit(handlePlaceOrder)}
            >
              Confirm Order
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Checkout;
