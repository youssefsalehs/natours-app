import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";

export default function useDeleteTour(id, setOpen) {
  const queryClient = useQueryClient();
  const token = useAuth((state) => state.token);
  return useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/tours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      console.log("Tour is successfully deleted!");
      queryClient.invalidateQueries(["tours"]);
      setOpen(false);
    },

    onError: (err) => {
      console.error("Delete tour failed:", err);
    },
  });
}
