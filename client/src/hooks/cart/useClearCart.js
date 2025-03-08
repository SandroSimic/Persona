import toast from "react-hot-toast";
import { clearCart } from "../../components/api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => clearCart(),

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["product"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to clear cart. Please try again.");
    },
  });

  return mutation;
};
