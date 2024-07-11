import {Flex} from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer>
      <Flex minWidth='max-content' bg={"gray.100"} p={2} mt={4} >
        &copy; 2024 Blog
      </Flex>
    </footer>
  );
};

export default Footer;