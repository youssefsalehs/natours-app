import api from "../api/axiosconfig";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";
function useFetchReviews() {
  const token = useAuth((state) => state.token);
  const fetchReviews = async () => {
    const res = await api.get("/reviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, isError, error };
}

export default useFetchReviews;
