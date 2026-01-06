import api from "../api/axiosconfig";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";
import useSearch from "../Store/useSearch";
function useFetchTours() {
  const search = useSearch((state) => state.search);
  const token = useAuth((store) => store.token);
  const fetchTours = async () => {
    const res = await api.get(`/tours${search ? `?search=${search}` : ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours", search],
    queryFn: fetchTours,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  return { data, isLoading, isError, error };
}

export default useFetchTours;
