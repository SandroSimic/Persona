import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const authApi = `${BASE_URL}/api/auth`;

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${authApi}/login`, user, {
      withCredentials: true,
    });

    console.log("RESPONSE from login user", response.data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getLoggedInUser = async () => {
  try {
    const response = await axios.get(`${authApi}/profile`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("RESPONSE from get user ", response.data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${authApi}/register`, user, {
      withCredentials: true,
    });

    console.log("RESPONSE from register user", response.data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
