import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createProduct } from "../adminApi/adminApi";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProductQuery } = useMutation({
    mutationFn: createProduct,
    onSuccess: (product) => {

      if (product.error) {
        toast.error(product.message);
        return;
      }
      toast.success(product.message);
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
  return { createProductQuery };
}
