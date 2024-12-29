import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../adminApi/adminApi";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProductQuery } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteProductQuery };
};
