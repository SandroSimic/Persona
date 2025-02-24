import toast from "react-hot-toast";
import { updateEmailUsername } from "../../components/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEmailUsername = () => {
  const queryClient = useQueryClient();
  const { mutate: updateEmailUsernameMutation } = useMutation({
    mutationFn: updateEmailUsername,
    onSuccess: () => {
      toast.success("Email and username updated successfully");
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
  return { updateEmailUsernameMutation };
};
