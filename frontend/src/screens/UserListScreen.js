import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = () => {
  const dispatch = useDispatch(); // To dispatch actions
  const navigate = useNavigate(); // To navigate to a different URL

  const userList = useSelector((state) => state.userList); // To get the user list state from redux store
  const { loading, error, users } = userList; // To get the loading, error, and users from the user list state

  const userLogin = useSelector((state) => state.userLogin); // To get the user login state from redux store
  const { userInfo } = userLogin; // To get the user info from the user login state

  const userDelete = useSelector((state) => state.userDelete); // To get the user delete state from redux store
  const { success } = userDelete; // To get the success from the user delete state

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, success]);

  //   const deleteHandler = (id) => {
  //     if (window.confirm("Are you sure?")) {
  //       // Delete user
  //       dispatch(deleteUser(id));
  //     }
  //   };

  // My Code
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // Check if the user being deleted is the currently logged-in user
      if (userInfo && userInfo._id === id) {
        // Display a message or prevent the deletion
        alert("You cannot delete yourself.");
      } else {
        // Delete user
        dispatch(deleteUser(id));
      }
    }
  };

  return (
    <>
      <Heading as="h1" fontSize="3xl" mb="5">
        Users
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>EMAIL</Th>
                <Th>ADMIN</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Td>
                  <Td>
                    {user.isAdmin ? (
                      <Icon
                        as={IoCheckmarkCircleSharp}
                        color="green.600"
                        w="8"
                        h="8"
                      />
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        color="red.600"
                        w="8"
                        h="8"
                      />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/user/${user._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default UserListScreen;
