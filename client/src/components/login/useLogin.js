import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginUserQuery } = useMutation({
    mutationFn: loginUser,
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
      console.log("ERROR", error);
    },
  });
  return { loginUserQuery };
}
