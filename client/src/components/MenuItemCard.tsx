import { StarIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';

import ItemCounter from './ItemCounter';

interface MenuItemCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  cafeName: string;
  rating: number;
  reviews: number;
}

function MenuItemCard(props: MenuItemCardProps) {
  const { id, name, price, imageUrl, cafeName, rating, reviews } = props;

  return (
    <Card
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: 'xl' }}
      w="250px"
    >
      <Image src={imageUrl} alt={name} objectFit="cover" h="150px" w="full" />
      <CardBody px="2" py="3">
        <VStack spacing="1" align="start">
          <Text fontWeight="500" fontSize="20px">
            {name}
          </Text>
          <Text color="#A5A5A5" fontSize="xs">
            {cafeName}
          </Text>

          <Flex align="baseline" justify="space-between" w="100%">
            <HStack spacing="2" align="baseline">
              <Text fontWeight="bold" color="#EE5733" fontSize="14px">
                Rs
              </Text>
              <Text fontWeight="bold" color="#EE5733" fontSize="20px">
                {price}
              </Text>
              <Text as="s" ml="2" color="gray.500" fontSize="10px" fontWeight="400">
                Rs {price * 1.3}
              </Text>
            </HStack>
            <HStack spacing="1" align="baseline">
              <StarIcon color="yellow.400" boxSize="3" />
              <Text fontSize="10px">{rating}</Text>
              <Text fontSize="10px" fontWeight="400" color="#A5A5A5">
                ({reviews})
              </Text>
            </HStack>
          </Flex>
        </VStack>
        <Flex justify="space-between" my="2">
          <ItemCounter />
          <Button background="#EE5733" color="#FFFFFF" fontSize="xs">
            Add to Cart
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default MenuItemCard;
