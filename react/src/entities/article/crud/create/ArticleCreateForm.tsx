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
  Switch, Textarea,
  VStack
} from "@chakra-ui/react";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import React from "react";
import {ArticleCreateFormData, articleCreateFormSchema} from "./zod.ts";

interface ArticleCreateFormProps {
  isError: boolean;
  isLoading: boolean;
  errorMessage?: string;
  onFormSubmit: (article: ArticleCreateFormData) => void;
}

export const ArticleCreateForm: React.FC<ArticleCreateFormProps> =
  ({isError, isLoading, errorMessage, onFormSubmit}) => {

    const form = useForm<ArticleCreateFormData>({
      mode: 'onChange',
      resolver: zodResolver(articleCreateFormSchema)
    });

    return (
      <VStack flexGrow={1}>
         <form onSubmit={form.handleSubmit(onFormSubmit)} encType={"multipart/form-data"}>
          <Center maxW="lg" w="lg" shadow="lg" backgroundColor="white" rounded='md'>
            <Stack spacing="2" pt="8" pb="8">
              <Center pb="2">
                <VStack>
                  <Image boxSize="64px" src={"/react.svg"}/>
                  <Heading fontSize="2xl">{"Create article"}</Heading>
                  {isError &&
                    <Box backgroundColor={'red.200'} p={'16px'} borderRadius={'8px'}>
                      <Heading fontSize={'2xm'} color={'red.700'}>{errorMessage}</Heading>
                    </Box>
                  }
                </VStack>
              </Center>
              <FormControl isInvalid={!!form.formState.errors.title}>
                <FormLabel>Title</FormLabel>
                <Input id="title" type="text" placeholder="Enter title" {...form.register('title')}/>
                <FormErrorMessage>{form.formState.errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.slug}>
                <FormLabel>Slug</FormLabel>
                <Input id="slug" type="text" placeholder="Here will be a slug"  {...form.register('slug')}/>
                <FormErrorMessage>{form.formState.errors.slug?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.image}>
                <FormLabel>Image</FormLabel>
                <Input id="image" type={"file"} placeholder="Image" {...form.register('image')}/>
                <FormErrorMessage>{form.formState.errors.image?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.excerpt}>
                <FormLabel>Excerpt</FormLabel>
                <Textarea id="excerpt" placeholder="Excerpt" {...form.register('excerpt')}/>
                <FormErrorMessage>{form.formState.errors.excerpt?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!form.formState.errors.content}>
                <FormLabel>Content</FormLabel>
                <Textarea id="content" placeholder="Content" {...form.register('content')}/>
                <FormErrorMessage>{form.formState.errors.content?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="article-enabled">Enabled</FormLabel>
                <Controller
                  control={form.control}
                  name='enabled'
                  defaultValue={false}
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
                <Button type="submit" colorScheme="twitter" variant="solid" isDisabled={isLoading}>Create</Button>
              </Stack>
            </Stack>
          </Center>
        </form>
      </VStack>
    );
  }
;
