import { useQuery } from "@tanstack/react-query";
import { getProfileStats } from "../../components/api/authApi";

export function useGetProfileStats() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["profile-stats"],
    queryFn: async () => getProfileStats(),
  });

  return { data, error, isLoading, refetch };
}
