import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "../../components/api/productApi";

export function useGetPopularProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: "popularProducts",
    queryFn: getPopularProducts,
  });

  return { data, error, isLoading };
}
