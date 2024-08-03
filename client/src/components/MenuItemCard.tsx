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

interface MenuItemCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  cafeName: string;
  rating: number;
}

function MenuItemCard(props: MenuItemCardProps) {
  const { id, name, price, imageUrl, cafeName, rating } = props;

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
          {cafeName}
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
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default MenuItemCard;
