import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../../components/api/orderApi";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderData) => {
      console.log("ORDER");
      return await createOrder(orderData);
    },

    onSuccess: () => {
      toast.success("Order created successfully");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      const errors = error.response.data.error.errors;
      Object.values(errors).forEach((err) => {
        toast.error(err.message);
      });
    },
  });

  return mutation;
};
