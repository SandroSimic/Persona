import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";

const prodcutApi = `${BASE_URL}/api/products`;

export const getProducts = async (params) => {
  const { data } = await axios.get(`${prodcutApi}`, {
    withCredentials: true,
    params,
  });
  return data;
};
