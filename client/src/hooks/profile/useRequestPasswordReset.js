import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../../components/api/authApi";
import toast from "react-hot-toast";

export const useRequestPasswordReset = () => {
  const { mutate: requestPasswordResetMutation } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success("Password reset email sent successfully");
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
  return { requestPasswordResetMutation };
};
