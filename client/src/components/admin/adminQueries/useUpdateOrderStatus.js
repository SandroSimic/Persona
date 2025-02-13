import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../api/orderApi";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { mutate: updateOrderStatusMutation } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      queryClient.invalidateQueries("orders");
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
  return { updateOrderStatusMutation };
}