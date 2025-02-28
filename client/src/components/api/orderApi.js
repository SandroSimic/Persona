import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const orderApi = `${BASE_URL}/api/order`;

export const createOrder = async (orderData) => {
  const response = await axios.post(`${orderApi}`, orderData, {
    withCredentials: true,
  });

  return response.data;
};

export const getAllOrders = async (params) => {
  try {
    const response = await axios.get(`${orderApi}`, {
      withCredentials: true,
      params,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getOrderById = async (params) => {
  try {
    const response = await axios.get(`${orderApi}/${params}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateOrderStatus = async ({ orderId, status }) => {
  try {
    const response = await axios.patch(
      `${orderApi}/update-status`,
      { orderId, status },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${orderApi}/${orderId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const myOrders = async (params) => {
  const response = await axios.get(`${orderApi}/my-orders`, {
    withCredentials: true,
    params,
  });

  return response.data;
};
