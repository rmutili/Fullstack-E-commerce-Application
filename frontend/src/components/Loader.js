import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" />
    </Flex>
  );
};

export default Loader;
