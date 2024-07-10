import {Link} from "react-router-dom";
import {Box, Button, ButtonGroup, Flex, GenericAvatarIcon, Heading, Image, Spacer} from "@chakra-ui/react";
import {useContextAuth} from "../auth/context/useContextAuth.tsx";
import {LogoutButton} from "../auth/logout/LogoutButton.tsx";


const Header = () => {
  const context = useContextAuth();
  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2' className={"mt-2 mb-4"}>
      <Image boxSize="32px" src={"/react.svg"}/>
      <Box p='2'>
        <Heading size='md'><Link to={"/"}>Blog</Link></Heading>
      </Box>
      <Spacer/>
      <ButtonGroup gap='2'>
        {context?.person?.email &&
          <Link to={"/admin/persons"}><Button colorScheme='twitter'>Admin</Button></Link>
        }
        {!context?.person?.email && <Link to={"/signup"}><Button colorScheme='twitter'>Sign Up</Button></Link>}
        {
          context?.person?.email ? <LogoutButton/> :
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
