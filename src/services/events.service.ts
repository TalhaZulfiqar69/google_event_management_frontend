import axios, { AxiosResponse } from "axios";

export const disconnectCalendar = async (
  token: string
): Promise<AxiosResponse> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/events/user/disconnect-calendar`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUserEvents = async (
  id: string,
  token: string
): Promise<AxiosResponse> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/events/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response;
  }
};
export const getGoogleEvents = async (
  token: string,
  accessToken: string
): Promise<AxiosResponse> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/events/google/${accessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response;
  }
};
