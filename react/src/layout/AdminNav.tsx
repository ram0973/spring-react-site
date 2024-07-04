import {Link} from "react-router-dom";
import {VStack} from "@chakra-ui/react";

const AdminNav = () => {
  return (
    <VStack alignSelf={"flex-start"}>
      <h2>
        <Link to={"/admin/persons"}>Persons list</Link>
      </h2>
      <h2>
        <Link to={"/admin/persons"}>Articless list</Link>
      </h2>
    </VStack>
  );
};

export default AdminNav;
