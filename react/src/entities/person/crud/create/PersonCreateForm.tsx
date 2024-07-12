import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Switch,
  VStack
} from "@chakra-ui/react";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import React from "react";
import {PersonCreateFormData, personCreateFormSchema} from "./zod.ts";
import {Person} from "../../model/Person.ts";

interface UserCreateFormProps {
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (person: Person) => void;
}

export const PersonCreateForm: React.FC<UserCreateFormProps> =
  ({isError, isLoading, errorMessage, onFormSubmit}) => {

    const form = useForm<PersonCreateFormData>({
      mode: 'onChange',
      resolver: zodResolver(personCreateFormSchema)
    });

    return (
      <VStack flexGrow={1}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
            <Stack spacing="2" pt="8" pb="8">
              <Center pb="8">
                <VStack>
                  <Image boxSize="64px" src={"/react.svg"}/>
                  <Heading fontSize="2xl">{"Create person"}</Heading>
                  {isError &&
                    <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                      <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                    </Box>
                  }
                </VStack>
              </Center>
              <FormControl isInvalid={!!form.formState.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input id="email" type="email"
                       placeholder="Enter email" {...form.register('email')}/>
                <FormErrorMessage>{form.formState.errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input id="password" type="password" placeholder="********"  {...form.register('password')}/>
                <FormErrorMessage>{form.formState.errors.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.confirmPassword}>
                <FormLabel>Repeat password</FormLabel>
                <Input id="confirmPassword" type="password"
                       placeholder="********"  {...form.register('confirmPassword')}/>
                <FormErrorMessage>{form.formState.errors.confirmPassword?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="person-enabled">Enabled</FormLabel>
                <Controller
                  control={form.control}
                  name='enabled'
                  defaultValue={false}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Switch
                      id="person-enabled"
                      onChange={(e) => onChange(e.target.checked)}
                      onBlur={onBlur}
                      isChecked={value}
                    />
                  )}
                />
              </FormControl>
              <Stack spacing="6" pt="4">
                <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>Create</Button>
              </Stack>
            </Stack>
          </Center>
        </form>
      </VStack>
    );
  }
;
