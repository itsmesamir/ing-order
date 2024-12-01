import {
  Box,
  Button,
  Image,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  IconButton,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';

import * as orderServices from 'services/oders';

import useCartStore from 'stores/useCartStore';
import useUserStore from 'stores/useUserStore';

import Loading from 'components/common/Loading';
import ItemCounter from 'components/ItemCounter';

import { useMenusQuery } from 'hooks/useMenusQuery';

import * as toast from 'utils/toast';
import { handleError } from 'utils/handleError';

import { CartItem, MenuItem, MenuCategory } from 'types/common';

import en from 'constants/en';

function Checkout() {
  const { data: currentUser } = useUserStore();
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  const { items: carts, summary, updateItemCount, clearCart, removeItem } = useCartStore();

  const { data, isLoading, error } = useMenusQuery({});

  const menuItems = data?.data || [];
  const categories = menuItems.map((item: MenuItem) => item.category);

  const payload = useMemo(
    () => ({
      user: { id: currentUser?.id },
      menuItems: carts.map(item => ({
        id: item?.menu?.id,
        cafeId: item.menu?.cafeId,
        quantity: item.quantity,
        price: Number(item.price),
        discount: Number(item.discount),
      })),
    }),
    [carts, currentUser]
  );

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

  const handleAddToCart = (menuItem: MenuItem) => {
    const existingItem = carts.find(item => item.menu?.id === menuItem.id);
    if (existingItem) {
      updateItemCount(menuItem.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        menu: menuItem,
        quantity: 1,
        price: menuItem.price,
        discount: menuItem.discount || 0,
      };
      updateItemCount(menuItem.id, 1);
      useCartStore.getState().addItem(newItem);
    }
  };

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item: MenuItem) => item.category?.name === selectedCategory)
    : menuItems;

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" fontWeight="semibold" color="red.500">
          Failed to load data. Please try again later.
        </Text>
      </Box>
    );

  return (
    <Box overflow="auto" height="100%">
      <Box
        bg="gray.200"
        height="50px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        top="0"
        zIndex="1"
      >
        <Text fontSize="lg" fontWeight="bold">
          Checkout
        </Text>
      </Box>

      <div className="p-6 bg-white rounded-lg overflow-auto h-100">
        <Text size="sm" fontSize={24} fontWeight={500} mb={5}>
          My Orders
        </Text>

        {carts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" fontWeight="semibold" color="red.500">
              Your cart is empty. Please add an item.
            </Text>
          </Box>
        ) : (
          <>
            <div className="flex flex-col">
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

            <div className="mt-6">
              <Text fontSize="lg" fontWeight="semibold">
                {en.ORDER.PAYMENT_SUMMARY}
              </Text>
            </div>

            <TableContainer>
              <Table size="sm">
                <Tbody>
                  <Tr>
                    <Td fontSize="lg" fontWeight="semibold" className="py-4">
                      Sub Total
                    </Td>
                    <Td fontSize="lg">{summary.subTotal}</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="lg" fontWeight="semibold" className="py-4">
                      Tax
                    </Td>
                    <Td fontSize="lg">{summary.tax}</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="lg" fontWeight="semibold" className="py-4">
                      Total
                    </Td>
                    <Td fontSize="lg">{summary.total}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <div className="w-100 mt-6 mr-6 flex justify-end">
              <Button
                colorScheme="orange"
                className="w-100"
                onClick={handlePlaceOrder}
                disabled={carts.length === 0}
              >
                {submitting ? <Loading /> : 'Order'}
              </Button>
            </div>
          </>
        )}

        <div className="mb-6">
          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select
              value={selectedCategory || ''}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {Array.from(
                new Map(
                  categories
                    .filter((category): category is MenuCategory => category !== undefined)
                    .map(category => [category.name, category])
                ).values()
              ).map(uniqueCategory => (
                <option key={uniqueCategory.id} value={uniqueCategory.name}>
                  {uniqueCategory.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <TableContainer>
            <Table size="sm">
              <Tbody>
                {filteredMenuItems.map((menuItem: MenuItem) => (
                  <Tr key={menuItem.id}>
                    <Td>
                      <Image
                        boxSize="50px"
                        objectFit="cover"
                        src={menuItem.imageUrl}
                        alt={menuItem.name}
                      />
                    </Td>
                    <Td>{menuItem.name}</Td>
                    <Td>{menuItem.price}</Td>
                    <Td>
                      <Button onClick={() => handleAddToCart(menuItem)} colorScheme="green">
                        Add to Cart
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Box>
  );
}

export default Checkout;
