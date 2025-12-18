import api from "../api/axiosconfig";
import { useQuery } from "@tanstack/react-query";

function useFetchBestTours() {
  const fetchBestTours = async () => {
    const res = await api.get(`/tours/top-5-cheap`);
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["best-tours"],
    queryFn: fetchBestTours,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  return { data, isLoading, isError, error };
}

export default useFetchBestTours;
