import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../adminApi/adminApi";

export function useGetDashboardState() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });

  return { data, error, isLoading, refetch };
}
