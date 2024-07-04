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

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Person} from "./model/Person.ts";


const personEditFormSchema = z
  .object({
    id: z.number().positive(),
    email: z.string().email("Invalid email"),
    enabled: z.boolean()
  });

type PersonEditFormData = z.infer<typeof personEditFormSchema>;

interface UserEditFormProps {
  preloadedValues: Person,
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (person: Person) => void;
}

const PersonForm = ({preloadedValues, isError, isLoading, errorMessage, onFormSubmit}: UserEditFormProps) => {
  const {
    //reset,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<PersonEditFormData>({
    mode: 'onChange',
    resolver: zodResolver(personEditFormSchema)
  });

  // useEffect(() => {
  //   reset(preloadedValues);
  // }, [preloadedValues, reset]);


  return (
    <VStack flexGrow={1}>
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
              <Input id="email" type="email" defaultValue={preloadedValues.email} placeholder="Enter email" {...register('email')}/>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="person-enabled">Enabled</FormLabel>
              <Switch id="person-enabled" defaultChecked={preloadedValues.enabled} {...register('enabled')}/>
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

export default PersonForm;
