import { Flex } from "@chakra-ui/react"
import Header from "./Header.tsx"
import Footer from "./Footer.tsx" // will add this in the part 2

export default function LandingLayout(props) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      <Header />
      {props.children}
      <Footer />
    </Flex>
  )
}