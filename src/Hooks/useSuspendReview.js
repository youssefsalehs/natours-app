import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";

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

    onSuccess: (data) => {
      console.log("review suspended:", data);
      queryClient.invalidateQueries(["reviews"]);
    },

    onError: (err) => {
      console.error("suspend review failed:", err);
    },
  });
}
