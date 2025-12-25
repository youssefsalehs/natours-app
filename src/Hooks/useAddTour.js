import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";

export default function useAddTour() {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);
  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/tours", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: (data) => {
      console.log("Tour added:", data);
      queryClient.invalidateQueries(["tours"]);
    },

    onError: (err) => {
      console.error("Add tour failed:", err);
    },
  });
}
