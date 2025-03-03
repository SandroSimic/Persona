import { addReview } from "../../components/api/reviewApi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (review) => {
      return await addReview(review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["product"]);
      toast.success("Review added");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  return mutation;
};
