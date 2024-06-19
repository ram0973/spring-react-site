import {Box, Button, ButtonGroup, Flex, Heading, Spacer} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {ReactIcon} from "@chakra-ui/icons";

const NavigationBar = () => {

  return (
    <>
      <Flex direction="row" minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
          <Heading size='md'><ReactIcon style={{cursor: 'pointer'}}/>Home</Heading>
        </Box>
        <Spacer/>
        <ButtonGroup gap='2'>
          <Button colorScheme='teal'>Admin</Button>
          <Button colorScheme='teal'>Sign Up</Button>
          <Button colorScheme='teal'>Login</Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default NavigationBar;
