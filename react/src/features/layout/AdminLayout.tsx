import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import "./layouts.css";
import Header from "./Header.tsx";
import {Box, Container, Stack} from "@chakra-ui/react";
import AdminNav from "./AdminNav.tsx";

const AdminLayout = () => {

  return (
    <div className="lg:container lg:mx-auto">
      <Header/>
      <Container className={"lg:container lg:mx-auto"}>
        <Stack direction={['column', 'row']} spacing='24px'>
          <Box w={"200px"}><AdminNav/></Box>
          <Box><Outlet/></Box>
        </Stack>
      </Container>
      <Footer/>
    </div>
  )
}

export default AdminLayout;