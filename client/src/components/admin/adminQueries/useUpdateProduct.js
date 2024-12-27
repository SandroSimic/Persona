import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../adminApi/adminApi";
import toast from "react-hot-toast";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: updateProductQuery, isLoading } = useMutation({
    mutationFn: ({ productData, productId }) =>
      updateProduct(productData, productId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
      // navigate("/admin/products");
    },
    onError: () => {
      toast.error("Error updating product");
    },
  });
  return { updateProductQuery, isLoading };
}
