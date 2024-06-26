import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import "./layouts.css";
import Header from "./Header.tsx";
import {Container, Flex, VStack} from "@chakra-ui/react";
import AdminNav from "./AdminNav.tsx";

const AdminLayout = () => {

  return (
    <div className="lg:container lg:mx-auto">
      <Header/>
      <Container className={"lg:container lg:mx-auto"}>
        <Flex direction={"row"} justify={"space-between"}>
          <VStack><AdminNav/></VStack>
          <VStack><Outlet/></VStack>
        </Flex>
      </Container>
      <Footer/>
    </div>
  )
}

export default AdminLayout;