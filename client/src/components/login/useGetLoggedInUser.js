import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../api/authApi";

export function useLoggedInUser() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  return { data, error, isLoading };
}
