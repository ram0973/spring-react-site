import {Box, Button, ButtonGroup, Flex, GenericAvatarIcon, Heading, Image, Spacer} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import {useAuth} from "../context/useAuth.tsx";
import LogoutButton from "../auth/logout/LogoutButton.tsx";

const Header = () => {
  const context = useAuth();
  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' className={"mt-2 mb-4"}>
      <Image boxSize="32px" src={"/react.svg"}/>
      <Box p='2'>
        <Heading size='md'><Link to={"/"}>Blog</Link></Heading>
      </Box>
      <Spacer/>
      <ButtonGroup gap='2'>
        <Button colorScheme='twitter'><Link to={"/admin/person-table"}>Admin</Link></Button>
        {!context.isAuthenticated && <Button colorScheme='twitter'><Link to={"/signup"}>Sign Up</Link></Button>}
        {!context.isAuthenticated ?
          <Button colorScheme='twitter'><GenericAvatarIcon boxSize={4}/><Link to={"/login"}> Login</Link></Button> :
          <LogoutButton/>
        }
      </ButtonGroup>
    </Flex>
  );
};

export default Header;