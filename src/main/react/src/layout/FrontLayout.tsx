import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import {Container} from "@chakra-ui/react";

export const FrontLayout = () => {
  return (
    <Container maxW={"1280px"}>
      <Header />
      <Outlet/>
      <Footer/>
    </Container>
  )
}
