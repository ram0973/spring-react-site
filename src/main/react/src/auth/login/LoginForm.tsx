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
import {LoginFormData, loginFormSchema} from "./zod.tsx";

type LoginFormProps = {
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (credentials: Credentials) => void;
}

export const LoginForm: React.FC<LoginFormProps> =
  ({isError, isLoading, errorMessage, onFormSubmit}) => {
    const navigate = useNavigate();
    const form = useForm<LoginFormData>({
      mode: 'onChange',
      resolver: zodResolver(loginFormSchema)
    });

    return (
      <Flex direction="row" flex="1" align="center" justify="center" backgroundColor="gray.100" p={10}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
            <Stack spacing="2" pt="16" pb="16">
              <Center pb="8">
                <VStack>
                  <Image boxSize="64px" src={"/react.svg"}/>
                  <Heading fontSize="2xl">Please login</Heading>
                  {isError &&
                    <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                      <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                    </Box>
                  }
                </VStack>
              </Center>
              <FormControl isInvalid={!!form.formState.errors.email}>
                <FormLabel htmlFor={"email"}>Email</FormLabel>
                <Input id="email" type="email" placeholder="Enter your email" {...form.register('email')}
                       autoComplete={"email"}/>
                <FormErrorMessage>{form.formState.errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.password}>
                <FormLabel htmlFor={"password"}>Password</FormLabel>
                <Input id="password" type="password" placeholder="********" {...form.register('password')}/>
                <FormErrorMessage>{form.formState.errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing="6" pt="4">
                <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>
                  Login
                </Button>
                <Link color="twitter.500" onClick={() => navigate("/signup")}>
                  Not signed up?
                </Link>
              </Stack>
            </Stack>
          </Center>
        </form>
      </Flex>
    );
  };
