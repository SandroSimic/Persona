import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../components/api/authApi";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (email) => {
      await forgotPassword(email);
    },

    onSuccess: () => {
      toast.success("Email sent successfully!");
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error(
        error.response.data.message || "Failed to send email. Please try again."
      );
    },
  });

  return { isPending, mutateAsync };
};
