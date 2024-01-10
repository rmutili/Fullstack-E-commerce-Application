import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex
} from "@chakra-ui/react";
import { IoCaretForwardSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      my="4"
      mx="auto"
      maxW="container.lg"
    >
      <Breadcrumb separator={<IoCaretForwardSharp color="gray.500" />}>
        <BreadcrumbItem>
          {step1 ? (
            <BreadcrumbLink as={RouterLink} to="/login">
              Sign In
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              opacity="0.5"
              _hover={{ textDecor: "none", cursor: "default" }}
            >
              Sign In
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {step2 ? (
            <BreadcrumbLink as={RouterLink} to="/shipping">
              Shipping
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              opacity="0.5"
              _hover={{ textDecor: "none", cursor: "default" }}
            >
              Shipping
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {step3 ? (
            <BreadcrumbLink as={RouterLink} to="/payment">
              Payment Method
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              opacity="0.5"
              _hover={{ textDecor: "none", cursor: "default" }}
            >
              Payment Method
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {step4 ? (
            <BreadcrumbLink as={RouterLink} to="/placeorder">
              Place Order
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink
              opacity="0.5"
              _hover={{ textDecor: "none", cursor: "default" }}
            >
              Place Order
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default CheckoutSteps;
