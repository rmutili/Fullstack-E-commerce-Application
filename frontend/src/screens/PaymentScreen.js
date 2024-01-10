import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Spacer
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = () => {
  const dispatch = useDispatch(); // We need to dispatch actions
  const navigate = useNavigate(); // We need to use navigate to redirect the user

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || "PayPal"
  ); // We need to set the payment method

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping"); // If the user is not logged in, we want to redirect them to the login page
    }
  }, [navigate, shippingAddress]); // We want to run this effect whenever the navigate or shippingAddress changes

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate("/placeorder");
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h2" mb="8" fontSize="3xl">
          Payment Method
        </Heading>
        <CheckoutSteps step1 step2 step3 />

        <form onSubmit={submitHandler}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Select Methods</FormLabel>
            <RadioGroup
              value={paymentMethodRadio}
              onChange={setPaymentMethodRadio}
            >
              <HStack spacing="24px">
                <Radio value="PayPal">PayPal or Credit/Debit Card</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Spacer my="3" />

          <Button type="submit" colorScheme="teal" my="4">
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default PaymentScreen;
