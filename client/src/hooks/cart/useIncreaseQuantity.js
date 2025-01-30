import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { increaseProductQuantity } from "../../components/api/cartApi";

export const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ productId, selectedSize }) =>
      increaseProductQuantity(productId, selectedSize),

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "Failed to increase product quantity. Please try again."
      );
    },
  });

  return mutation;
};
