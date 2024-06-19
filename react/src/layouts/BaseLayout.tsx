import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";
import {Container, createStandaloneToast} from "@chakra-ui/react";

const BaseLayout = (props) => {

  return (
    <>
      <Container maxW={"container.lg"}>
        <NavigationBar/>
        {props.children}
        <Footer/>
      </Container>
    </>
  )
}

export default BaseLayout;