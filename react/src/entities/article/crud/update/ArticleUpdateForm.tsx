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
import React, {useEffect} from "react";
import {ArticleUpdateFormData, articleUpdateFormSchema} from "./zod.ts";
import {Article} from "../../model/Article.ts";

interface ArticleUpdateFormProps {
  article: Article | undefined,
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (article: Article) => void;
}

export const ArticleUpdateForm: React.FC<ArticleUpdateFormProps> =
  ({article, isError, isLoading, errorMessage, onFormSubmit}) => {

    const {
      reset,
      control,
      register,
      handleSubmit,
      formState: {errors}
    } = useForm<ArticleUpdateFormData>({
      mode: 'onChange',
      resolver: zodResolver(articleUpdateFormSchema)
    });

    useEffect(() => {
      if (article) {
        const defaultValues = {
          ...article
        };
        reset(defaultValues);
      }
    }, [article, reset]);

    return (
      <VStack flexGrow={1}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
            <Stack spacing="2" pt="16" pb="16">
              <Center pb="8">
                <VStack>
                  <Image boxSize="64px" src={"/react.svg"}/>
                  <Heading fontSize="2xl">{article ? "Edit article" : "Create article"}</Heading>
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
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input id="title" type="text" placeholder="Enter article title" {...register('title')}/>
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="article-enabled">Enabled</FormLabel>
                <Controller
                  control={control}
                  name='enabled'
                  render={({field: {onChange, onBlur, value}}) => (
                    <Switch
                      id="article-enabled"
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
