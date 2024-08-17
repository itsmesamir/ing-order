import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';

import { signUp } from 'services/auth';

import useUserStore from 'stores/useUserStore';

import Alert from 'components/Alert';

import { useDesignationsQuery } from 'hooks/useDesignationsQuery';
import { useCountriesQuery } from 'hooks/useCountriesQuery';

import { parseError } from 'utils/handleError';
import { handleLogin } from 'utils/handleAuth';

import { Any, CustomError } from 'types/common';

import paths from 'constants/paths';

export default function SignUp() {
  const history = useHistory();
  const { updateUser } = useUserStore();
  const designationsQuery = useDesignationsQuery({});
  const { data: designations = [] } = designationsQuery;
  const countriesQuery = useCountriesQuery({});
  const { data: countries = [] } = countriesQuery;
  const toast = useToast();

  const [errors, setErrors] = useState<CustomError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const body: Any = Object.fromEntries(formData.entries());

    body.designationId = parseInt(body.designation, 10);
    body.countryId = parseInt(body.country, 10);
    delete body.designation;
    delete body.country;

    try {
      setIsSubmitting(true);
      const data = await signUp(body);

      handleLogin(data.tokens);
      updateUser(data.user);

      history.push(paths.home);
    } catch (error) {
      const submitErrors = parseError(error);

      setErrors(submitErrors as CustomError[]);
      toast({
        title: 'An error occurred.',
        description: 'Unable to sign up.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  return (
    <Box minH="100vh" py={12} px={6} display="flex" flexDirection="column" justifyContent="center">
      <Box mx="auto" w="full" maxW="sm">
        <Text mt={10} textAlign="center" fontSize="2xl" fontWeight="bold" color="gray.900">
          Sign up to your account
        </Text>
      </Box>

      <Box mt={10} mx="auto" w="full" maxW="sm">
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Full name</FormLabel>
              <Input type="text" name="name" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Department</FormLabel>
              <Input type="text" name="department" />
            </FormControl>

            <FormControl>
              <FormLabel>Designation</FormLabel>
              <Select name="designation">
                {designations.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Number</FormLabel>
              <Input
                type="number"
                name="phone"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit number"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select name="country" value={country} onChange={handleCountryChange}>
                {countries.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Alert errors={errors} />

            <Button
              isLoading={isSubmitting}
              type="submit"
              bg="#4f46e5"
              _hover={{ bg: '#6366f1' }}
              color="white"
              width="full"
            >
              {!isSubmitting ? 'Sign Up' : 'Submitting'}
            </Button>
          </Stack>
        </form>

        <Text mt={10} textAlign="center" fontSize="sm" color="gray.500">
          Already a member?{' '}
          <Link
            href={paths.signin}
            color="indigo.600"
            fontWeight="semibold"
            _hover={{ color: 'indigo.500' }}
          >
            Sign In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
