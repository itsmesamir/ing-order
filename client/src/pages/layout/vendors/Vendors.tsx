import { Heading } from '@chakra-ui/react';
import React from 'react';

import ImageCarousel from 'components/common/ImageCarousel/ImageCarousel';

const images = [
  'https://img.olx.com.br/images/50/509193481673478.jpg',
  'https://img.olx.com.br/images/50/505167365537533.jpg',
  'https://img.olx.com.br/images/50/501177121104088.jpg',
  'https://img.olx.com.br/images/50/504102247685480.jpg',
  'https://img.olx.com.br/images/50/500120243101489.jpg',
];

function Vendors() {
  return (
    <div>
      <Heading as="h2" size="lg">
        Top Vendors
      </Heading>
      <ImageCarousel images={images} />
    </div>
  );
}

export default Vendors;
