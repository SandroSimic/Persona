import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../../components/api/orderApi";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderData) => {
      return await createOrder(orderData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Order created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create order. Please try again.");
    },
  });

  return mutation;
};
