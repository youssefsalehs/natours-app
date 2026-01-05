import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";

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
      toast.success("Tour is successfully deleted!");
      queryClient.invalidateQueries(["tours"]);
      setOpen(false);
    },

    onError: (err) => {
      toast.error("Delete tour failed:", err);
    },
  });
}
