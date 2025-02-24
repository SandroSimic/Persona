import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutateAsync: loginUserQuery, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      if (user.error) {
        toast.error(user.message);
        return;
      }

      toast.success("Logged in successfully!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to login.");
      console.log("ERROR", error);
    },
  });
  return { loginUserQuery, isPending };
}
