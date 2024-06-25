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
import z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Credentials} from "../models/models.ts";

const registerFormSchema = z
  .object({
    email: z.string().email("Невалидный email"),
    password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
    confirmPassword: z.string().min(8, "Пароли должны совпадать"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"]
    }
  );

type RegisterFormData = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (credentials: Credentials) => void;
  onLinkClick: () => void;
}

const SignupForm = ({isError, isSuccess, isLoading, errorMessage, onFormSubmit, onLinkClick}: RegisterFormProps) => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    resolver: zodResolver(registerFormSchema)
  });

  return (
    <Flex direction="row" flex="1" align="center" justify="center" backgroundColor="gray.100" p={10}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
          <Stack spacing="2" pt="16" pb="16">
            <Center pb="8">
              <VStack>
                <Image boxSize="64px" src={"/react.svg"}/>
                <Heading fontSize="2xl">Зарегистрируйте свой аккаунт</Heading>
                {isSuccess &&
                  <Box backgroundColor={'green.200'} p={'16px'} borderRadius={'8px'}>
                    <Heading fontSize={'2xm'} color={'green.700'}>Аккаунт успешно зарегистрирован</Heading>
                  </Box>
                }
                {isError &&
                  <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                    <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                  </Box>
                }
              </VStack>
            </Center>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Электронная почта</FormLabel>
              <Input id="email" type="email" placeholder="Введите электронную почту" {...register('email')}/>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Пароль</FormLabel>
              <Input id="password" type="password" placeholder="********"  {...register('password')}/>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Подтвердите пароль</FormLabel>
              <Input id="confirmPassword" type="password" placeholder="********"  {...register('confirmPassword')}/>
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing="6" pt="4">
              <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>
                Зарегистрировать аккаунт
              </Button>
              <Link color="twitter.500" onClick={onLinkClick}>
                Аккаунт уже зарегистрирован?
              </Link>
            </Stack>
          </Stack>
        </Center>
      </form>
    </Flex>
  );
};

export default SignupForm;