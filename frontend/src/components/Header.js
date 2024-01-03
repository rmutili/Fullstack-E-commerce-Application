import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HiShoppingBag, HiUser, HiMenu } from "react-icons/hi";
import HeaderMenuItem from "./HeaderMenuItem";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      p="6"
      bgColor="gray.800"
      pos="fixed"
      w="full"
      top="0"
      left="0"
      zIndex="99999"
    >
      <Link as={RouterLink} to="/">
        <Heading
          as="h1"
          color="whiteAlpha.800"
          fontWeight="bold"
          size="md"
          LetterSpacing="wide"
        >
          RST Store
        </Heading>
      </Link>
      <Box
        display={{ base: "block", md: "none" }}
        pos="relative"
        top="1"
        onClick={() => setShow(!show)}
      >
        <Icon as={HiMenu} color="white" w="5" h="5" />
      </Box>

      <Box
        as="nav"
        display={{ base: show ? "none" : "block", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: "2", md: "0" }}
      >
        <HeaderMenuItem icon={HiShoppingBag} label="Cart" url="/cart" />
        <HeaderMenuItem icon={HiUser} label="Login" url="/login" />
      </Box>
    </Flex>
  );
};

export default Header;
