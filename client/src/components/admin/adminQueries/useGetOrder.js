import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../api/orderApi";

export function useGetOrder(params) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["order", params],
    queryFn: async () => getOrderById(params),
  });

  return { data, error, isLoading, refetch };
}
