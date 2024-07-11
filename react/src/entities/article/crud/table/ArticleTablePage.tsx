import {Heading, HStack, VStack} from "@chakra-ui/react";

export const ArticleTablePage: React.FC = () => {

  return (
    <VStack flex={1}>
      <HStack justifyContent={"space-between"}>
        <Heading size={"lg"}>Articles</Heading>
      </HStack>
    </VStack>
  )
}
