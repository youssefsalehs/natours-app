import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";

export default function useGuides() {
  const token = useAuth((state) => state.token);
  return useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await api.get("/users?role[in]=guide,lead-guide", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data.data;
    },
  });
}
