import React, { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

function ItemCounter() {
  const [count, setCount] = useState(1);

  const increaseCount = () => setCount(count + 1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <HStack spacing="1" align="center">
      <IconButton
        icon={<MinusIcon />}
        aria-label="Decrease quantity"
        size="sm"
        onClick={decreaseCount}
      />
      <Text>{count}</Text>
      <IconButton
        icon={<AddIcon />}
        aria-label="Increase quantity"
        size="sm"
        onClick={increaseCount}
      />
    </HStack>
  );
}

export default ItemCounter;
