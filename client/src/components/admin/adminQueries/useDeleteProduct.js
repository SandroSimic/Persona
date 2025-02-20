import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../adminApi/adminApi";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProductQuery } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
  });

  return { deleteProductQuery };
};
