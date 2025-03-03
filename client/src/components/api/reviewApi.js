import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const reviewApi = `${BASE_URL}/api/reviews`;

export const addReview = async (review) => {
  const response = await axios.post(reviewApi, review, {
    withCredentials: true,
  });

  return response.data;
};

export const getReviewsForProduct = async (productId) => {
  const response = await axios.get(`${reviewApi}/${productId}`, {
    withCredentials: true,
  });

  return response.data;
};
