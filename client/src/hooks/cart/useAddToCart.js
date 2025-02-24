import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addToCart } from "../../components/api/cartApi";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  // Define the mutation
  const mutation = useMutation({
    mutationFn: async ({ productId, selectedSize, quantity }) => {
      return await addToCart(productId, selectedSize, quantity);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Product added to cart!");
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to add product to cart. Please try again."
      );
    },
  });

  return mutation;
};
