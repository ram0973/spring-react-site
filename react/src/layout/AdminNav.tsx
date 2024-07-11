import {Link} from "react-router-dom";
import {Button, VStack} from "@chakra-ui/react";

const AdminNav = () => {
  return (
    <VStack alignSelf={"flex-start"}>
      <Link to={"/admin/persons"}><Button>Persons</Button></Link>
      <Link to={"/admin/articles"}><Button>Articles</Button></Link>
    </VStack>
  );
};

export default AdminNav;
