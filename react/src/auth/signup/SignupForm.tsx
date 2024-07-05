import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  VStack
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Credentials} from "../model/Credentials.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {SignupFormData, signupFormSchema} from "./zod.tsx";

type SignupFormProps = {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (credentials: Credentials) => void;
}

export const SignupForm: React.FC<SignupFormProps> =
  ({isError, isSuccess, isLoading, errorMessage, onFormSubmit}) => {
  const navigate = useNavigate();
  const form = useForm<SignupFormData>({
    mode: 'onChange',
    resolver: zodResolver(signupFormSchema)
  });

  return (
    <Flex direction="row" flex="1" align="center" justify="center" backgroundColor="gray.100" p={10}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
          <Stack spacing="2" pt="16" pb="16">
            <Center pb="8">
              <VStack>
                <Image boxSize="64px" src={"/react.svg"}/>
                <Heading fontSize="2xl">Please sign up</Heading>
                {isSuccess &&
                  <Box backgroundColor={'green.200'} p={'16px'} borderRadius={'8px'}>
                    <Heading fontSize={'2xm'} color={'green.700'}>You successfully signed up</Heading>
                  </Box>
                }
                {isError &&
                  <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                    <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                  </Box>
                }
              </VStack>
            </Center>
            <FormControl isInvalid={!!form.formState.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input id="email" type="email" placeholder="Enter your email" {...form.register('email')}/>
              <FormErrorMessage>{form.formState.errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.password}>
              <FormLabel>Password</FormLabel>
              <Input id="password" type="password" placeholder="********"  {...form.register('password')}/>
              <FormErrorMessage>{form.formState.errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!form.formState.errors.confirmPassword}>
              <FormLabel>Repeat password</FormLabel>
              <Input id="confirmPassword" type="password" placeholder="********"  {...form.register('confirmPassword')}/>
              <FormErrorMessage>{form.formState.errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing="6" pt="4">
              <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>
                Sign up
              </Button>
              <Link color="twitter.500" onClick={() => navigate("/login")}>
                Already signed up?
              </Link>
            </Stack>
          </Stack>
        </Center>
      </form>
    </Flex>
  );
};
