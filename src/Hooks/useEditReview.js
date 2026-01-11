import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

export default function useEditReview(tourId) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);

  return useMutation({
    mutationFn: async (formData) => {
      const { id, ...data } = formData;
      const res = await api.patch(`/reviews/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["tour", tourId]);
      toast.success("Review updated successfully");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update review");
    },
  });
}
