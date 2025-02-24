import toast from "react-hot-toast";
import { verifyPasswordResetToken } from "../../components/api/authApi";
import { useMutation } from "@tanstack/react-query";

export const useVerifyPasswordCode = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ code, email }) => {
      await verifyPasswordResetToken(code, email);
    },
    onSuccess: () => {
      toast.success("Code verified successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to verify code. Please try again."
      );
    },
  });

  return { isPending, mutateAsync };
};
