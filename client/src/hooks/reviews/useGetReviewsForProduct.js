import { useQuery } from "@tanstack/react-query";
import { getReviewsForProduct } from "../../components/api/reviewApi";

export function useGetReviewsForProduct(productId) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => getReviewsForProduct(productId),
  });
  return {
    data,
    error,
    isLoading,
  };
}
