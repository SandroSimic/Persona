import { useQuery } from "@tanstack/react-query";
import { myOrders } from "../../components/api/orderApi";

export function useMyOrders(params) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["my-orders", params],
    queryFn: async () => myOrders(params),
  });

  return { data, error, isLoading, refetch };
}
