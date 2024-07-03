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
  Stack,
  Switch,
  VStack
} from "@chakra-ui/react";
import z from 'zod';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useParams} from "react-router-dom";
import {Person} from "./model/Person.ts";
import {useEffect, useState} from "react";
import {useGetPerson} from "./service/queries.ts";
import {data} from "autoprefixer";

const personEditFormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    enabled: z.boolean()
  });

type PersonEditFormData = z.infer<typeof personEditFormSchema>;

interface UserEditFormProps {
  preloadedValues: Person,
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (person: PersonEditRequestDto) => void;
}

const PersonForm = ({preloadedValues, isError, isLoading, errorMessage, onFormSubmit}: UserEditFormProps) => {
  console.log(preloadedValues);
  const {
    reset,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<PersonEditFormData>({
    defaultValues: preloadedValues,
    mode: 'onChange',
    resolver: zodResolver(personEditFormSchema)
  });

  useEffect(() => {
      reset(preloadedValues);
  }, [preloadedValues, reset]);


  return (
    <Flex direction="row" flex="1" align="center" justify="center" backgroundColor="gray.100" p={10}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
          <Stack spacing="2" pt="16" pb="16">
            <Center pb="8">
              <VStack>
                <Image boxSize="64px" src={"/react.svg"}/>
                <Heading fontSize="2xl">{preloadedValues ? "Edit person" : "Create person"}</Heading>
                {isError &&
                  <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                    <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                  </Box>
                }
              </VStack>
            </Center>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input id="email" type="email" placeholder="Enter email" {...register('email')}/>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="person-enabled">Enabled</FormLabel>
              <Switch id="person-enabled" />
            </FormControl>
            <Stack spacing="6" pt="4">
              <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Center>
      </form>
    </Flex>
  );
};

export default PersonForm;
