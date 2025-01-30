/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../components/api/productApi";

export function getProductDetail(productId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => getProduct(productId),
  });

  return { data, error, isLoading };
}
