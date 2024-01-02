import { Icon, Link } from "@chakra-ui/react";

const HeaderMenuItem = ({ url, label, icon }) => {
  return (
    <Link
      href={url}
      fontSize="sm"
      fontWeight="bold"
      letterSpacing="wide"
      textTransform="uppercase"
      mr="5"
      display="flex"
      aligniItems="center"
      color="whiteAlpha.800"
      _hover={{ textDecoration: "none" }}
      mt={{ base: "2", md: 0 }}
    >
      <Icon as={icon} mr="1" w="4" h="4" />
      {label}
    </Link>
  );
};

export default HeaderMenuItem;
