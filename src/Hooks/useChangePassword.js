import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import { useNavigate } from "react-router-dom";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";
function useChangePassword() {
  const token = useAuth((state) => state.token);
  console.log(token);
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();
  async function changePassword(data) {
    const res = await api.patch("/users/updatePassword", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (result) => {
      const newToken = result.token;
      const user = result.data.user;
      login(user, newToken);
      navigate("/");
      toast.success("password is changed");
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        toast.error("Current password is incorrect");
      } else if (err.response?.status === 403) {
        toast.error("You are not authorized");
      } else {
        toast.error("Something went wrong");
      }
    },
  });
  return { mutate, isPending };
}

export default useChangePassword;
