import api from "../api/axiosconfig";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";
function useFetchTours() {
  const token = useAuth((store) => store.token);
  const fetchTours = async () => {
    const res = await api.get("/tours", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  return { data, isLoading, isError, error };
}

export default useFetchTours;
