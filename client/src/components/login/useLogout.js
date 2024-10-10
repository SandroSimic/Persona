import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../api/authApi";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Hook to handle navigation

  const {
    mutate: logout,
    isLoading,
    data,
  } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });

      navigate("/login");

      toast.success("Logged out successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });

  return { logout, isLoading, data };
}
