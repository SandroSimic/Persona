import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const authApi = `${BASE_URL}/api/auth`;

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${authApi}/login`, user, {
      withCredentials: true,
    });


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


    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${authApi}/logout`, {}, {
      withCredentials: true,
    });


    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
