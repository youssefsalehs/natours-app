import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

export default function useUpdateTour(tourId) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);

  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.patch(`/tours/${tourId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success("Tour is updated");
      queryClient.invalidateQueries(["tours"]);
      queryClient.invalidateQueries(["tour", tourId]);
    },

    onError: (err) => {
      toast.error("Update tour failed:", err);
    },
  });
}
