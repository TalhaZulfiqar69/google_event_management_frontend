import axios, { AxiosResponse } from "axios";

interface UserData {
  email: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
}

export const authenticationWithGoogle = async (): Promise<AxiosResponse> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/auth/google/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response;
  }
};

export const verifyGoogleIdentity = async (
  code: string
): Promise<AxiosResponse> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/auth/google/identity-verification/${code}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response;
  }
};

export const signup = async (data: UserData): Promise<AxiosResponse> => {
  try {
    const user = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response.data;
  }
};

export const logout = async (token: string): Promise<AxiosResponse> => {
  try {
    const user = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
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

export const signin = async (data: UserData): Promise<AxiosResponse> => {
  try {
    const user = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
      {
        email: data?.email,
        password: data?.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return user;
  } catch (error: any) {
    return error.response.data;
  }
};
