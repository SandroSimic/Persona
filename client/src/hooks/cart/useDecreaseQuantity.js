import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { decreaseProductQuantity } from "../../components/api/cartApi";

export const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ productId, selectedSize }) =>
      decreaseProductQuantity(productId, selectedSize),

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to decrease product quantity. Please try again."
      );
    },
  });

  return mutation;
};
