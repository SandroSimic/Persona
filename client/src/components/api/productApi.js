import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";
import toast from "react-hot-toast";

const productApi = `${BASE_URL}/api/products`;

export const getProducts = async (params) => {
  const { data } = await axios.get(`${productApi}`, {
    withCredentials: true,
    params,
  });
  return data;
};

export const getProduct = async (id) => {
  const { data } = await axios.get(`${productApi}/${id}`, id, {
    withCredentials: true,
  });
  return data;
};

export const addToFavorite = async (productId) => {
  const { data } = await axios.put(
    `${productApi}/add-to-favorite`,
    { productId },
    { withCredentials: true }
  );

  if (data) {
    toast.success(data.message);
  }
  return data;
};

export const getFavorites = async () => {
  const { data } = await axios.get(`${productApi}/get-favorites`, {
    withCredentials: true,
  });

  return data;
};
