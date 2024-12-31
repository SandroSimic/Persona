import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

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
