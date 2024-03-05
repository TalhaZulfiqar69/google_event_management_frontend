import React, { useEffect, useState } from "react";
import { Button, Flex, Stack, Heading } from "@chakra-ui/react";
import { authenticationWithGoogle } from "../services/auth.service";
import { getUserEvents } from "../services/events.service";
import DataTable from "react-data-table-component";
import moment from "moment";
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

  const userDataFromStorage = localStorage.getItem("userInfo");
  const initialUserData = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : {};

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

  return (
    <Flex mt={24}>
      <Stack spacing={8} mx={"auto"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Events Module</Heading>
        </Stack>
        {!events?.length && (
          <Button onClick={() => googleAuth()}> Connect Google Calendar</Button>
        )}
        {events?.length && (
          <DataTable columns={columns} data={data} pagination />
        )}
      </Stack>
    </Flex>
  );
};

export default Events;
