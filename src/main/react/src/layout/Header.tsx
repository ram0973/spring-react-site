import {Link} from "react-router-dom";
import {Box, Button, ButtonGroup, Flex, Heading, Image, Spacer} from "@chakra-ui/react";
import {useAuthContext} from "../auth/context/useAuthContext.tsx";
import {LogoutButton} from "../auth/logout/LogoutButton.tsx";


const Header = () => {
  const context = useAuthContext();
  return (
    <>
      <Flex bg={"gray.100"} minWidth='max-content' alignItems='center' gap='2' p={2} mt={4} mb={8}>
        <Image boxSize="32px" src={"/react.svg"}/>
        <Box p='2'>
          <Heading size='md'><Link to={"/"}>Blog</Link></Heading>
        </Box>
        <Spacer/>
        <ButtonGroup gap='2'>
          {context?.person &&
            <Link to={"/admin/persons"}><Button colorScheme='twitter'>Admin</Button></Link>
          }
          {!context?.person && <Link to={"/signup"}><Button colorScheme='twitter'>Sign Up</Button></Link>}
          {
            context?.person ? <LogoutButton/> :
              <Link to={"/login"}>
                <Button colorScheme="twitter">Login</Button>
              </Link>
          }
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Header;
