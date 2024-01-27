import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  // This is the screen where the admin can edit a user's details (name, email, and admin status)
  const dispatch = useDispatch(); // To dispatch actions to the redux store
  const navigate = useNavigate(); // To navigate to a different URL (similar to history.push)
  const { id: userId } = useParams(); // To get the user ID from the URL path

  const [name, setName] = useState(""); // To store the name of the user being edited
  const [email, setEmail] = useState(""); // To store the email of the user being edited
  const [isAdmin, setIsAdmin] = useState(false); // To store the admin status of the user being edited

  const userDetails = useSelector((state) => state.userDetails); // To get the user details state from the redux store
  const { loading, error, user } = userDetails; // To get the loading, error, and user from the user details state

  const userUpdate = useSelector((state) => state.userUpdate); // To get the user update state from the redux store (this is for updating the user's name, email, and admin status)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = userUpdate;

  useEffect(() => {
    // This will run when the component loads for the first time
    if (successUpdate) {
      // If the user details are successfully updated, reset the user update state and navigate to the user list screen
      dispatch({ type: USER_UPDATE_RESET }); // Reset the user update state to prevent the user edit screen from showing the success message again
      navigate("/admin/userlist"); // Navigate to the user list screen (similar to history.push)
    } else {
      if (!user?.name || user._id !== userId) {
        // If the user details are not loaded or the user ID in the URL path does not match the user ID in the user details state, get the user details
        dispatch(getUserDetails(userId)); // Get the user details (name, email, and admin status)
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, successUpdate, navigate]); // Re-run this effect when the user, dispatch, user ID, success update, and navigate change

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    dispatch(updateUser({ _id: userId, name, email, isAdmin })); // Update the user's name, email, and admin status
  };

  return (
    <>
      <Link as={RouterLink} to="/admin/userlist">
        Go Back
      </Link>
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            Edit User
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              <FormControl id="isAdmin" isRequired>
                <FormLabel>Is Admin?</FormLabel>
                <Checkbox
                  size="lg"
                  colorScheme="teal"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                >
                  Is Admin?
                </Checkbox>
              </FormControl>
              <Spacer h="3" />

              <Button
                type="submit"
                isLoading={loading}
                colorScheme="teal"
                mt="4"
              >
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default UserEditScreen;
