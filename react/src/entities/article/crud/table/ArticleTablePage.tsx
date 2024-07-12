import {Button, Heading, HStack, VStack} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import React from "react";

export const ArticleTablePage: React.FC = () => {

  return (
    <VStack flex={1}>
      <HStack justifyContent={"space-between"}>
        <Heading size={"lg"}>Articles</Heading>
        <Link to={"/admin/articles/create"}><Button colorScheme='twitter'><AddIcon/>Add article</Button></Link>
      </HStack>
    </VStack>
  )
}
