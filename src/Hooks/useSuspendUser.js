import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

export default function useSuspendUser(id) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);
  return useMutation({
    mutationFn: async () => {
      const res = await api.patch(`/users/${id}/toggle-suspend`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success("user is suspended");
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err) => {
      toast.error("suspend user failed:", err);
    },
  });
}
