import axios from "axios";
import { BASE_URL } from "../../../utils/constants.js";

const adminApiProducts = `${BASE_URL}/api/products`;

export const createProduct = async (product) => {
  try {
    console.log("product", product);
    const response = await axios.post(`${adminApiProducts}`, product, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProduct = async (productData, productId) => {
  try {
    console.log("productData", productData);
    const response = await axios.patch(
      `${adminApiProducts}/${productId}`,
      productData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
