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
import z from 'zod';

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Person} from "../model/Person.ts";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useUpdatePerson} from "./update/useUpdatePerson.ts";


const personEditFormSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email("Invalid email"),
    enabled: z.boolean()
  });

type PersonEditFormData = z.infer<typeof personEditFormSchema>;

interface UserEditFormProps {
  isCreate: boolean,
  preloadedValues: Person,
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

export const PersonForm:React.FC<UserEditFormProps> =
  ({isCreate, preloadedValues, isError, isLoading, errorMessage}) => {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<PersonEditFormData>({
    mode: 'onChange',
    resolver: zodResolver(personEditFormSchema)
  });

  useEffect(() => {
    reset(preloadedValues);
  }, [preloadedValues, reset]);

  const mutation = useUpdatePerson()
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<Person> = (data) => {
    console.log("submitted")
    mutation.mutate(data);
    navigate("/");
  }

  return (
    <VStack flexGrow={1}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
          <Stack spacing="2" pt="16" pb="16">
            <Center pb="8">
              <VStack>
                <Image boxSize="64px" src={"/react.svg"}/>
                <Heading fontSize="2xl">{isCreate ? "Create person" : "Edit person"}</Heading>
                {isError &&
                  <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                    <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                  </Box>
                }
              </VStack>
            </Center>
            <input type="hidden" {...register('id')} />
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
                Save
              </Button>
            </Stack>
          </Stack>
        </Center>
      </form>
    </VStack>
  );
};
