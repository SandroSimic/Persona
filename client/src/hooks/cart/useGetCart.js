/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../components/api/cartApi";

export function getCart() {
  const { data, error, isLoading, refetch,  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => getUserCart(),
  });

  return { data, error, isLoading, refetch };
}

