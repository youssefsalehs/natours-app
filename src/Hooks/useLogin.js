import api from "../api/axiosconfig";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function useLogin() {
  const login = useAuth((store) => store.login);
  const navigate = useNavigate();
  const loginApi = async (data) => {
    const res = await api.post("/users/login", data);
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (result) => {
      const token = result.token;
      const user = result.data.user;
      login(user, token);
      navigate("/");
      toast.success("logged in successfully");
    },
    onError: (err) => {
      toast.error(`Login failed: ${err?.message ?? "Unexpected error"}`);
    },
  });
  return { mutate, isPending };
}

export default useLogin;
