import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api/orderApi";

export function useGetOrders(params) {
  const { data, error, isPending } = useQuery({
    queryKey: ["orders", params],
    queryFn: async () => getAllOrders(params),
  });

  return { data, error, isPending };
}
