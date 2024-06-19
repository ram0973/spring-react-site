import {Box, Flex, Heading} from "@chakra-ui/react";
import {ReactIcon} from "@chakra-ui/icons";

const Footer = () => {
  return (
    <>
      <Flex direction="row" minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
          <Heading size='md'>Footer (C) 2025</Heading>
        </Box>
      </Flex>
    </>
  );
};

export default Footer;