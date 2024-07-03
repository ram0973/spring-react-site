import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import "./layouts.css";
import Header from "./Header.tsx";
import {Container, Flex, VStack} from "@chakra-ui/react";
import AdminNav from "./AdminNav.tsx";

const AdminLayout = () => {

  return (
    <>
      <Container maxW="container.xl" p={0}>
        <VStack w={"100vw"}>
        <Header/>
        <Flex>
          <AdminNav/>
        </Flex>
        <Flex>
          <Outlet/>
        </Flex>
        <Footer/>
        </VStack>
      </Container>
    </>
  )
}

export default AdminLayout;