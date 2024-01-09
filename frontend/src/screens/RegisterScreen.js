import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
<<<<<<< HEAD
  Spacer,
=======
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { register } from "../actions/userActions";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

<<<<<<< HEAD
  let [searchParams] = useSearchParams();
=======
  const [searchParams] = useSearchParams();
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
  let redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null); // error message from the backend if there is one
=======
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (password !== confirmPassowrd) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
=======
    dispatch(register(name, email, password));
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
<<<<<<< HEAD
          Register
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Your Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
=======
          Register User
        </Heading>

        {error && <Message type="error">{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

<<<<<<< HEAD
          <Spacer h="3" />

          <FormControl id="email">
=======
          <FormControl id="email" mt="4">
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
<<<<<<< HEAD
              placeholder="username@domain.com"
=======
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

<<<<<<< HEAD
          <Spacer h="3" />

          <FormControl id="password">
=======
          <FormControl id="password" mt="4">
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
<<<<<<< HEAD
              placeholder="*************"
=======
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

<<<<<<< HEAD
          <Spacer h="3" />

          <FormControl id="confirmPassword">
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="*************"
              value={confirmPassowrd}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
=======
          <Button
            type="submit"
            variant="solid"
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
            colorScheme="teal"
            w="full"
            mt="4"
            isLoading={loading}
          >
            Register
          </Button>
        </form>

<<<<<<< HEAD
        <Flex pt="10">
          <Text fontWeight="semibold">
            Already have an account?{" "}
            <Link as={RouterLink} to={`/login?redirect=${redirect}`}>
              Click here to login
=======
        <Flex mt="4" direction="column" alignItems="center">
          <Text>
            Already have an account?{" "}
            <Link as={RouterLink} to={`/login?redirect=${redirect}`}>
              Login
>>>>>>> 08cfbf7fd6bb2b017eda253e8e89a374f47c5520
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default RegisterScreen;
