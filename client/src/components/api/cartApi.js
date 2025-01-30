import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const cartApi = `${BASE_URL}/api/cart`;

export const getUserCart = async () => {
  try {
    const response = await axios.get(`${cartApi}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addToCart = async (productId, selectedSize, quantity) => {
  try {
    const response = await axios.post(
      `${cartApi}/${productId}`,
      { selectedSizeQty: quantity, selectedSize },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add product to cart."
    );
  }
};

export const removeProductFromCart = async (productId) => {
  try {
    const response = await axios.delete(`${cartApi}/${productId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.patch(
      `${cartApi}/clear`,
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

export const increaseProductQuantity = async (productId, selectedSize) => {
  try {
    const response = await axios.patch(
      `${cartApi}/${productId}/increase`,
      { selectedSize },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to increase product quantity. Please try again."
    );
  }
};

export const decreaseProductQuantity = async (productId, selectedSize) => {
  try {
    const response = await axios.patch(
      `${cartApi}/${productId}/decrease`,
      { selectedSize },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to decrease product quantity. Please try again."
    );
  }
};
