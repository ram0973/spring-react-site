import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import AdminNav from "./AdminNav.tsx";
import {Container, HStack} from "@chakra-ui/react";

const AdminLayout = () => {

  return (
    <Container maxW={"1280px"}>
      <Header/>
      <HStack>
        <AdminNav/>
        <Outlet/>
      </HStack>
      <Footer/>
    </Container>
  )
}

export default AdminLayout;