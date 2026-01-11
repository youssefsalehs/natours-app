import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

export default function useAddReview(tourId) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);
  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/reviews", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["tour", tourId]);
      toast.success("Review is added");
    },

    onError: (err) => {
      if (err.response.data.message.includes("E11000")) {
        toast.error("you've already reviewed this tour");
      } else {
        toast.error("Add review failed:", err);
      }
    },
  });
}
