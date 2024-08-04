import React, { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

interface ItemCounterProps {
  quantity?: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function ItemCounter(props: ItemCounterProps) {
  const { quantity = 1, setCount } = props;

  const increaseCount = () => setCount(prev => prev + 1);

  const decreaseCount = () => {
    setCount(prev => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <HStack spacing="1" align="center">
      <IconButton
        icon={<MinusIcon />}
        aria-label="Decrease quantity"
        size="sm"
        onClick={decreaseCount}
      />
      <Text>{quantity}</Text>
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
