import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { HiShoppingBag, HiUser, HiMenu } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import HeaderMenuItem from "./HeaderMenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      p="6"
      bgColor="gray.800"
      pos="fixed"
      w="full"
      top="0"
      left="0"
      zIndex="99999"
    >
      <Link as={RouterLink} to="/">
        <Heading
          as="h1"
          color="whiteAlpha.800"
          fontWeight="bold"
          size="md"
          letterSpacing="wide"
        >
          RST Store
        </Heading>
      </Link>
      <Box
        display={{ base: "block", md: "none" }}
        pos="relative"
        top="1"
        onClick={() => setShow(!show)}
      >
        <Icon as={HiMenu} color="white" w="5" h="5" />
      </Box>

      <Box
        as="nav"
        display={{ base: show ? "none" : "block", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: "3", md: "0" }}
      >
        <HeaderMenuItem icon={HiShoppingBag} label="Cart" url="/cart" />
        {userInfo ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDown />}>
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/userlist">
                Users
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/productlist">
                Products
              </MenuItem>
              <MenuItem as={RouterLink} to="/admin/orderlist">
                Orders
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HeaderMenuItem icon={HiUser} label="Login" url="/login" />
        )}
      </Box>
    </Flex>
  );
};

export default Header;
