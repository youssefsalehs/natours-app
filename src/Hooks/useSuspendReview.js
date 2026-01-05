import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

export default function useSuspendReview(id) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);
  return useMutation({
    mutationFn: async () => {
      const res = await api.patch(`/reviews/${id}/suspend`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success("review is suspended");
      queryClient.invalidateQueries(["reviews"]);
    },

    onError: (err) => {
      toast.error("suspend review failed:", err);
    },
  });
}
