import {Flex} from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer>
      <Flex minWidth='max-content' className={"m-2"}>
        &copy; 2024 Blog
      </Flex>
    </footer>
  );
};

export default Footer;