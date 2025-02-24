import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../components/api/authApi";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ email, code, password }) => {
      await resetPassword(email, code, password);
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    },
  });
  return { isPending, mutateAsync };
};
