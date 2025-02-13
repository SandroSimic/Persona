import toast from "react-hot-toast";
import { deleteOrder } from "../../api/orderApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteOrderQuery } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
  });

  return { deleteOrderQuery };
}