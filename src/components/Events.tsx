import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Stack,
  Heading,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { authenticationWithGoogle } from "../services/auth.service";
import { getUserEvents, disconnectCalendar } from "../services/events.service";
import DataTable from "react-data-table-component";
import moment from "moment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Row {
  attendees: [];
  createdAt: string;
  end: string;
  eventDate: string;
  eventName: string;
  organizer: string;
  start: string;
  updatedAt: string;
  userId: string;
  _id: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const userDataFromStorage = localStorage.getItem("userInfo");
  const initialUserData = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : {};

  useEffect(() => {
    if (!initialUserData?.token) {
      navigate("/");
      toast.error(`Authentication required`);
    }
  }, []);
  const handleGetUserEvents = async () => {
    try {
      const eventsData: any = await getUserEvents(
        initialUserData._id,
        initialUserData.token
      );

      if (eventsData && eventsData.data.success === true) {
        setEvents(eventsData?.data?.data);
      } else {
      }
    } catch (error: any) {
      console.log(`${error.response.message}`);
    }
  };

  useEffect(() => {
    handleGetUserEvents();
  }, []);

  const googleAuth = async () => {
    try {
      const response = await authenticationWithGoogle();

      if (response && response?.data?.data) {
        window.location.href = response?.data?.data;
      }
    } catch (error: any) {
      console.log(`${error}`);
    }
  };
  // Table columns
  const columns = [
    {
      name: "Event Name",
      selector: (row: Row) => row.eventName,
    },
    {
      name: "Organizer",
      selector: (row: Row) => row.organizer,
    },
    {
      name: "start Time",
      selector: (row: Row) => moment(row.start).format("MMMM Do, h:mm a"),
    },
    {
      name: "End Time",
      selector: (row: Row) => moment(row.end).format("MMMM Do, h:mm a"),
    },
  ];

  const data: Row[] = events;
  const handleDisconnectCalendar = async () => {
    try {
      const response = await disconnectCalendar(initialUserData?.token);
      if (response && response?.data?.success === true) {
        handleGetUserEvents();
        toast.success(`${response?.data?.message}`);
      }
    } catch (error: any) {
      console.log(`${error}`);
    }
  };
  return (
    <Flex mt={24}>
      <Stack spacing={8} mx={"auto"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Events Module</Heading>
        </Stack>
        {!events?.length && (
          <Button onClick={() => googleAuth()}>Connect Google Calendar</Button>
        )}
        {events?.length && (
          <>
            <SimpleGrid columns={5} spacingX="40px" spacingY="20px">
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box>
                <Button onClick={() => handleDisconnectCalendar()}>
                  Disconnect Calendar
                </Button>
              </Box>
            </SimpleGrid>
            <DataTable columns={columns} data={data} pagination />
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default Events;
