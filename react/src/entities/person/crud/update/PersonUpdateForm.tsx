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

import {Person} from "../../model/Person.ts";
import React, {useEffect} from "react";
import {PersonUpdateFormData, personUpdateFormSchema} from "./zod.ts";


interface PersonUpdateFormProps {
  person: Person | undefined,
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (person: Person) => void;
}

export const PersonUpdateForm: React.FC<PersonUpdateFormProps> =
  ({person, isError, isLoading, errorMessage, onFormSubmit}) => {

    const {
      reset,
      control,
      register,
      handleSubmit,
      formState: {errors}
    } = useForm<PersonUpdateFormData>({
      mode: 'onChange',
      resolver: zodResolver(personUpdateFormSchema)
    });

    useEffect(() => {
      const defaultValues = {
        id: person.id,
        email: person.email,
        enabled: person.enabled,
      };
      reset(defaultValues);
    }, [person, reset]);

    return (
      <VStack flexGrow={1}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
            <Stack spacing="2" pt="16" pb="16">
              <Center pb="8">
                <VStack>
                  <Image boxSize="64px" src={"/react.svg"}/>
                  <Heading fontSize="2xl">{person ? "Edit person" : "Create person"}</Heading>
                  {isError &&
                    <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                      <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                    </Box>
                  }
                </VStack>
              </Center>

              <FormControl isInvalid={!!errors.id}>
                <FormLabel>Id</FormLabel>
                <Input id="id" type="input" disabled {...register('id')}/>
                <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input id="email" type="email"
                       placeholder="Enter email" {...register('email')}/>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="person-enabled">Enabled</FormLabel>
                <Controller
                  control={control}
                  name='enabled'
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
                <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>
                  {"Update"}
                </Button>
              </Stack>
            </Stack>
          </Center>
        </form>
      </VStack>
    );
  };
