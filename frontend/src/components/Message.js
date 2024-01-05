import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Message = ({ children, type = "info" }) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default Message;
