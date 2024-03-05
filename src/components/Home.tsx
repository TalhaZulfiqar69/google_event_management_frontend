import React from "react";
import { Flex, Stack, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex mt={24}>
      <Stack spacing={8} mx={"auto"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            Welcome to Events Management system
          </Heading>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Home;
