import {
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
import appLogo from '../../assets/logo.svg'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import publicApi from "../../config/api-client.ts";

interface Credentials {
  email: string;
  password: string;
}

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

const RegisterForm = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    resolver: zodResolver(registerFormSchema)
  });

  const handleFormSubmit = (credentials: Credentials) => {
    console.log('credentials', credentials);
    publicApi.post('/api/v1/auth/register', credentials)
      .then(()=>console.log("Successfully registered"))
      .catch(err => console.log(err));
  }

  return (
    <Flex direction="row" flex="1" align="center" justify="center" backgroundColor="gray.100">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
          <Stack spacing="2" pt="16" pb="16">
            <Center pb="8">
              <VStack>
                <Image boxSize="64px" src={appLogo}/>
                <Heading fontSize="2xl">Зарегистрируйте свой аккаунт</Heading>
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
              <Button type="submit" colorScheme="twitter" variant="solid">
                Зарегистрировать аккаунт
              </Button>
              <Link color="twitter.500">
                Аккаунт уже зарегистрирован?
              </Link>
            </Stack>
          </Stack>
        </Center>
      </form>
    </Flex>
  );
};

export default RegisterForm;