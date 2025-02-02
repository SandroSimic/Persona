import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const orderApi = `${BASE_URL}/api/order`;

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${orderApi}`, orderData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
