import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

function RightColumn() {
  return (
    <div className="flex flex-col flex-1">
      <nav className="flex justify-between max-h-16 h-16  items-center px-6 sticky top-0 z-50 bg-white">
        <div className="flex">
          <div>search</div>
          <div>filter</div>
        </div>

        <div className="flex">
          <div>location</div>
          <div>notification</div>
          <div>profile</div>
        </div>
      </nav>

      {/* body */}
      <div className="flex">
        <div className="flex flex-wrap gap-12 flex-1  justify-center px-6">
          {Array.from({ length: 100 }).map((_, index) => (
            <Card maxW="sm" className="w-60">
              <CardBody>
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Living room Sofa</Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy
                    toned spaces and for people who love a chic design with a sprinkle of vintage
                    design.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    $450
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
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
          ))}
        </div>

        {/* Order */}
        <div className="sticky top-[64px] bg-slate-200 right-0 w-80 h-[70vh]">cart</div>
      </div>
    </div>
  );
}

export default RightColumn;
