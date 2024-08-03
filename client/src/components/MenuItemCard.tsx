import { StarIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { CartItem, MenuItem } from 'types/common';

interface MenuItemCardProps {
  item: MenuItem;
  addItem: (item: CartItem) => void;
}

function MenuItemCard(props: MenuItemCardProps) {
  const { item, addItem } = props;

  const { id, name, price, imageUrl, cafe, rating } = item;

  return (
    <Card border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden" boxShadow="md">
      <Image src={imageUrl} alt={name} />
      <CardBody textAlign="center">
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text color="orange.500" fontSize="md">
          {price}
        </Text>
        <Text color="orange.500" fontSize="md">
          {cafe?.name}
        </Text>
        <HStack justify="center" spacing="1">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon key={index} color={index < rating ? 'orange.500' : 'gray.300'} />
          ))}
        </HStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              addItem({ item, quantity: 1, price: item.price, discount: item.discount });
            }}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default MenuItemCard;
