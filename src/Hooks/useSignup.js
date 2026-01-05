import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function useSignup() {
  const login = useAuth((store) => store.login);
  const navigate = useNavigate();
  async function signup(data) {
    const res = await api.post("/users/signup", data);
    return res.data;
  }
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (result) => {
      const token = result.token;
      const user = result.data.user;
      login(user, token);
      navigate("/");
      toast.success("welcome, " + result.data.user.name);
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { mutate, isPending };
}

export default useSignup;
