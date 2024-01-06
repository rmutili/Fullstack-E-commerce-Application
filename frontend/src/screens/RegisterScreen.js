import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
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

  const [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Register User
        </Heading>

        {error && <Message type="error">{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="email" mt="4">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mt="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            colorScheme="teal"
            w="full"
            mt="4"
            isLoading={loading}
          >
            Register
          </Button>
        </form>

        <Flex mt="4" direction="column" alignItems="center">
          <Text>
            Already have an account?{" "}
            <Link as={RouterLink} to={`/login?redirect=${redirect}`}>
              Login
            </Link>
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default RegisterScreen;
