import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

export default function useDeleteReview(tourId) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);
  return useMutation({
    mutationFn: async (reviewId) => {
      const res = await api.delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["tour", tourId]);
      toast.success("Review is deleted");
    },

    onError: (err) => {
      console.log(err);
      toast.error("delete review failed:", err);
    },
  });
}
