import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

const Links = [{ name: "Events", path: "/events" }];

const WithAction: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const userDataFromStorage = localStorage.getItem("userInfo");
  const initialUserData = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : {};

  const handleLogoutUser = async () => {
    try {
      const user: any = await logout(initialUserData?.token);
      if (user && user.data.success === true) {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error.response.message);
    }
  };

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight={"bolder"} fontSize={24}>
              <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                Events Management System
              </span>
            </Box>
            {initialUserData && initialUserData?.token && (
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <Box as="a" px={2} py={1} rounded={"md"}>
                  {Links.map((link) => (
                    <span
                      key={link?.name}
                      onClick={() => navigate(link?.path)}
                      style={{ cursor: "pointer" }}
                    >
                      {link?.name}
                    </span>
                  ))}
                </Box>
              </HStack>
            )}
          </HStack>
          <Flex alignItems={"center"}>
            {!initialUserData?.token && (
              <>
                <Button
                  variant={"solid"}
                  size={"sm"}
                  mr={4}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </>
            )}

            {initialUserData && initialUserData?.token && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleLogoutUser()}>Logout</MenuItem>
                  {/* <MenuDivider /> */}
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen && initialUserData && initialUserData?.token ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <span
                  key={link?.name}
                  onClick={() => navigate(link?.path)}
                  style={{ cursor: "pointer" }}
                >
                  {link?.name}
                </span>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default WithAction;
