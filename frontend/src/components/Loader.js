import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
      />
    </Flex>
  );
};

export default Loader;
