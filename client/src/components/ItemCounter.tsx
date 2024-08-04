import React, { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, IconButton, ResponsiveValue, Text } from '@chakra-ui/react';

type ItemCounterProps = {
  variant?: 'default' | 'rounded';
  size?: ResponsiveValue<string>;
  quantity?: number;
  countText?: {
    fontSize?: string;
    fontWeight?: string;
  };
};

function ItemCounter(props: ItemCounterProps) {
  const { variant = 'default', size = 'sm', countText, quantity } = props;

  const [count, setCount] = useState(quantity || 1);

  const increaseCount = () => setCount(count + 1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <HStack spacing="3" align="center">
      <IconButton
        backgroundColor={variant === 'rounded' ? 'gray.800' : 'white'}
        rounded={variant === 'rounded' ? 'full' : 'md'}
        icon={<MinusIcon color={variant === 'rounded' ? 'white' : 'black'} />}
        aria-label="Decrease quantity"
        size={size}
        onClick={decreaseCount}
        _hover={{ backgroundColor: 'gray.900' }}
      />
      <Text fontSize={countText?.fontSize} fontWeight={countText?.fontWeight}>
        {count}
      </Text>
      <IconButton
        backgroundColor={variant === 'rounded' ? 'gray.800' : 'white'}
        rounded={variant === 'rounded' ? 'full' : 'md'}
        icon={<AddIcon color={variant === 'rounded' ? 'white' : 'black'} />}
        aria-label="Increase quantity"
        size={size}
        onClick={increaseCount}
        _hover={{ backgroundColor: 'gray.900' }}
      />
    </HStack>
  );
}

export default ItemCounter;
