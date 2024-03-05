import React, { useState, Fragment } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signin } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

interface USER {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const signinUser = async (values: USER) => {
    try {
      setIsLoading(true);
      const user: any = await signin(values);
      if (user && user.data.success === true) {
        localStorage.setItem("userInfo", JSON.stringify(user?.data?.data));
        toast.success(`${user?.data?.message}`);
        setIsLoading(false);
        navigate("/events");
      } else {
        setIsLoading(false);
        toast.error(`${user?.message}`);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.response.message}`);
    }
  };
  return (
    <Flex align={"center"} justify={"center"} mt={24}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Email is invalid.")
                  .trim()
                  .max(50, "Email must be at most 20 characters.")
                  .required("Email is required."),
                password: Yup.string()
                  .trim()
                  .max(20, "Password must be at most 20 characters.")
                  .min(8, "Password must be 8 characters at minimum.")
                  .required("Password is required."),
              })}
              onSubmit={(values) => {
                signinUser(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                  noValidate
                  autoComplete="off"
                >
                  <FormControl id="email" mb={4}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      className="pe-3"
                      type="email"
                      name="email"
                      placeholder="Enter username or email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />

                    <span className="mt-1 d-block" style={{ color: "red" }}>
                      {errors.email && touched.email ? (
                        <Fragment>{errors.email}</Fragment>
                      ) : null}
                    </span>
                  </FormControl>

                  <FormControl id="password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        className="pe-3"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                      />

                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <span className="mt-1 d-block" style={{ color: "red" }}>
                      {errors.password && touched.password ? (
                        <Fragment>{errors.password}</Fragment>
                      ) : null}
                    </span>
                  </FormControl>

                  <Stack spacing={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <ThreeDots
                            height="30"
                            width="30"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        </div>
                      ) : (
                        "SIGN IN"
                      )}
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
