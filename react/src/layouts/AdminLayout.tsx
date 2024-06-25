import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";
import {Container} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";

const AdminLayout = (props) => {

  return (
    <>
      <Container maxW={"container.lg"}>
        <NavigationBar/>
        <Outlet />
        <Footer/>
      </Container>
    </>
  )
}

export default AdminLayout;