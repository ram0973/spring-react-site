import {Avatar, HStack, Switch, Td, Text, Tr, useDisclosure} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {useToast} from "@chakra-ui/toast";
import React from "react";
import {Link} from "react-router-dom";
import {ArticleDeleteModal} from "./ArticleDeleteModal.tsx";
import {useDeleteArticle} from "../delete/useDeleteArticle.ts";


type ArticleTableRowProps = {
  article: Article,
}

export const ArticleTableRow: React.FC<ArticleTableRowProps> = ({article}) => {
  const deleteModalDisclosure = useDisclosure();
  const deleteMutation = useDeleteArticle();
  const toast = useToast();

  function deleteArticleHandle(id: number) {
    deleteModalDisclosure.onClose();
    deleteMutation.mutateAsync(id)
      .then(() => toast({title: "Success!", description: "Successfully deleted article"}))
      .catch((error) => toast(
        {
          title: "Error!",
          description: error.response.data.message,
          status: "error",
        }
      ))
  }

  return (
    <Tr key={article.id}>
      <Td>{article.id}</Td>
      <Td><HStack><Text>{article.title}</Text></HStack></Td>
      <Td><Switch disabled id='isEnabled' isChecked={article.enabled} style={{cursor: 'pointer'}}/></Td>
      <Td>{new Date(article.dateCreated).toLocaleDateString()}</Td>
      <Td>
        <HStack>

          <Link to={`/admin/articles/update/${article.id}`}><EditIcon style={{cursor: 'pointer'}}/></Link>
          <DeleteIcon onClick={deleteModalDisclosure.onOpen} style={{cursor: 'pointer'}} />
          <ArticleDeleteModal isOpen={deleteModalDisclosure.isOpen}
                              onClose={deleteModalDisclosure.onClose}
                              title={article.title} dataKey={article.id}
                              onClick={async () => deleteArticleHandle(article.id)}/>
          <Link to={`/articles/view/${article.id}`}><ViewIcon style={{cursor: 'pointer'}}/></Link>
        </HStack>
      </Td>
    </Tr>
  );
}
