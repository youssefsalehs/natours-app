import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../Store/useAuth";

function useResetPass() {
  const navigate = useNavigate();
  const login = useAuth((store) => store.login);
  const resetPassApi = async ({ token, password, passwordConfirm }) => {
    const res = await api.patch(`/users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassApi,
    onSuccess: (result) => {
      const token = result.token;
      const user = result.data.user;
      login(user, token);
      navigate("/");
    },
    onError: (err) => {
      console.error("Reset password failed:", err);
    },
  });

  return { mutate, isPending };
}

export default useResetPass;
