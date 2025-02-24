import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../components/api/authApi";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ newPassword }) => {
      await updatePassword(newPassword);
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    },
  });
  return { isPending, mutateAsync };
};
