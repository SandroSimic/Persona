import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const authApi = `${BASE_URL}/api/auth`;

export const loginUser = async (user) => {
  const response = await axios.post(`${authApi}/login`, user, {
    withCredentials: true,
  });

  return response.data;
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
  const response = await axios.post(`${authApi}/register`, user, {
    withCredentials: true,
  });

  return response.data;
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${authApi}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProfileStats = async () => {
  try {
    const response = await axios.get(`${authApi}/profile-stats`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateEmailUsername = async ({ email, username, image }) => {
  try {
    const response = await axios.put(
      `${authApi}/update-email-username`,
      { email, username, userImage: image },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(
      `${authApi}/request-password-reset`,
      email,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${authApi}/forgot-password`,
    { email },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const verifyPasswordResetToken = async (token, email) => {
  const response = await axios.post(
    `${authApi}/verify-reset-code`,
    {
      email,
      code: token,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const resetPassword = async (email, code, password) => {
  const response = await axios.post(
    `${authApi}/reset-password`,
    { email, code, password },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const updatePassword = async (newPassword) => {
  const response = await axios.put(
    `${authApi}/update-password`,
    { newPassword },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
