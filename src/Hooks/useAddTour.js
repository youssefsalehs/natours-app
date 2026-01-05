import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

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

    onSuccess: () => {
      queryClient.invalidateQueries(["tours"]);
      toast.success("new tour is added");
    },

    onError: (err) => {
      toast.error("Add tour failed:", err);
    },
  });
}
