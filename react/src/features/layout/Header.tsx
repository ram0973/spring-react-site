import {Box, Button, ButtonGroup, Flex, Heading, Image, Spacer} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' className={"m-2"}>
      <Image boxSize="32px" src={"/react.svg"}/>
      <Box p='2'>
        <Heading size='md'><Link to={"/"}>Blog</Link></Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <Button colorScheme='twitter'><Link to={"/admin/person-table"}>Admin</Link></Button>
        <Button colorScheme='twitter'><Link to={"/signup"}>Sign Up</Link></Button>
        <Button colorScheme='twitter'><Link to={"/login"}>Log in</Link></Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;