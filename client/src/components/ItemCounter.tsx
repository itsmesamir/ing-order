import React, { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, IconButton, ResponsiveValue, Text } from '@chakra-ui/react';

type ItemCounterProps = {
  variant?: 'default' | 'rounded';
  size?: ResponsiveValue<string>;
  count: number;
  countText?: {
    fontSize?: string;
    fontWeight?: string;
  };
  handleCount: (count: number) => void;
};

function ItemCounter(props: ItemCounterProps) {
  const { variant = 'default', size = 'sm', countText, count, handleCount } = props;

  const increaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCount(count + 1);
    e.preventDefault();
  };

  const decreaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (count > 1) {
      handleCount(count - 1);
    }
    e.preventDefault();
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
      />
    </HStack>
  );
}

export default ItemCounter;
