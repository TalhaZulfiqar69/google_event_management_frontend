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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signup } from "../services/auth.service";
import toast from "react-hot-toast";

interface USER {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const signUp = async (values: USER) => {
    try {
      setIsLoading(true);
      const user: any = await signup(values);

      if (user && user.data.success === true) {
        toast.success(`${user?.data?.message}`);
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        toast.error(`${user?.data?.message}`);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.response.message}`);
      console.log(`${error.response.message}`);
    }
  };
  return (
    <Flex align={"center"} justify={"center"} mt={24}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Setup your new account</Heading>
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
                name: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().trim().required("Name is required."),
                email: Yup.string()
                  .email("Email is invalid.")
                  .trim()
                  .max(50, "Email must be at most 20 characters.")
                  .required("Email is required."),
                password: Yup.string()
                  .trim()
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
                    "Password must contain atleast 8 characters including one lowercase letter, one uppercase letter, and one numeric digit."
                  )
                  .max(
                    20,
                    "Password should not contain more than 15 characters."
                  )
                  .min(8, "Password must have atleast 8 characters.")
                  .required("Password is required."),
                confirmPassword: Yup.string()
                  .required("Confirm password is required.")
                  .oneOf(
                    [Yup.ref("password")],
                    "Both passwords need to be the same."
                  ),
              })}
              onSubmit={(values) => {
                signUp(values);
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
                  <FormControl id="name" mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      className="pe-3"
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />

                    <span className="mt-1 d-block" style={{ color: "red" }}>
                      {errors.name && touched.name ? (
                        <Fragment>{errors.name}</Fragment>
                      ) : null}
                    </span>
                  </FormControl>
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
                  <FormControl id="confirmPassword" mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        className="pe-3"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.confirmPassword}
                      />

                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowConfirmPassword(
                              (showConfirmPassword) => !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <span className="mt-1 d-block" style={{ color: "red" }}>
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <Fragment>{errors.confirmPassword}</Fragment>
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
                        "SIGN UP"
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

export default Register;
