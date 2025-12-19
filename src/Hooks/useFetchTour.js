import api from "../api/axiosconfig";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";
function useFetchTour(id) {
  const token = useAuth((store) => store.token);
  const fetchTour = async () => {
    const res = await api.get(`/tours/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tour", id],
    queryFn: fetchTour,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, isError, error };
}

export default useFetchTour;
