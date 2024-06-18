import React from 'react';
import {Box, Button, ButtonGroup, Flex, Heading, Spacer} from "@chakra-ui/react";
import LandingLayout from "../../to_see/LandingLayout.tsx";

const MainMenu = () => {
  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
          <Heading size='md'>Chakra App</Heading>
        </Box>
        <Spacer/>
        <ButtonGroup gap='2'>
          <Button colorScheme='teal'>Sign Up</Button>
          <Button colorScheme='teal'>Log in</Button>
        </ButtonGroup>
      </Flex>
      <LandingLayout props={MainMenu}/>
    </>
  );
};

export default MainMenu;