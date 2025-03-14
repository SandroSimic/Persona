import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: registerUserQuery } = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      if (user.error) {
        toast.error(user.message);
        return;
      }
      toast.success(user.message);
      navigate("/");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { registerUserQuery };
}
