import {Flex} from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer className={"mt-2 mb-auto relative left-0 bottom-0 right-0"}>
      <Flex minWidth='max-content' >
        &copy; 2024 Blog
      </Flex>
    </footer>
  );
};

export default Footer;