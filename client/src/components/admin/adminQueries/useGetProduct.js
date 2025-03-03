import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productApi";

export function useProducts(params) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", params],
    queryFn: async () => getProducts(params),
  });

  return { data, error, isLoading, refetch };
}
