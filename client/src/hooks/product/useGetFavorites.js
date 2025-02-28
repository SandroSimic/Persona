import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../components/api/productApi";

export function useGetFavorites() {
  const { data, error, isLoading } = useQuery({
    queryKey: "favorites",
    queryFn: getFavorites,
  });

  return { data, error, isLoading };
}
