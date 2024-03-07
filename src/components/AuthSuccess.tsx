import React, { useEffect, useState } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyGoogleIdentity } from "../services/auth.service";
import { ThreeDots } from "react-loader-spinner";
import { getGoogleEvents } from "../services/events.service";

const Events: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userDataFromStorage = localStorage.getItem("userInfo");
  const initialUserData = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : {};

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setCode(searchParams.get("code"));
  }, []);

  const fetchData = async (code: string) => {
    try {
      const response = await verifyGoogleIdentity(code);
      if (response?.data?.data && response?.data?.data?.accessToken) {
        await getGoogleEvents(
          initialUserData?.token,
          response?.data?.data?.accessToken
        );
        setLoading(false);
        navigate("/events", { state: { user: response?.data?.data } });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchData(code);
    }
  }, [code]);
  return (
    <Flex mt={24}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        {loading && <ThreeDots />}
      </Stack>
    </Flex>
  );
};

export default Events;
