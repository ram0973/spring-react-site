import NavigationBar from "../components/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";
import {Container} from "@chakra-ui/react";

const BaseLayout = (props) => {
  return (
    <>
      <Container>
        <NavigationBar/>
        {props.children}
        <Footer/>
      </Container>
    </>
  )
}

export default BaseLayout;