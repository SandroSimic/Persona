import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createProduct } from "../adminApi/adminApi";
import { useNavigate } from "react-router-dom";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: createProductQuery } = useMutation({
    mutationFn: createProduct,
    onSuccess: (product) => {

      if (product.error) {
        toast.error(product.message);
        return;
      }
      console.log(product);
      toast.success(product.message);
      navigate("/admin/products");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
  return { createProductQuery };
}
