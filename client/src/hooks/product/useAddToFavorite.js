import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorite } from "../../components/api/productApi";
import toast from "react-hot-toast";

export const useAddToFavorite = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (productId) => {
      return await addToFavorite(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to add product to favorite. Please try again."
      );
    },
  });
  return mutation;
};
