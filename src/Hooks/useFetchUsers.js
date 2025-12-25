import api from "../api/axiosconfig";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";
function useFetchUsers() {
  const token = useAuth((state) => state.token);
  const fetchUsers = async () => {
    const res = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, isError, error };
}

export default useFetchUsers;
