import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function useForgetPass() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post(`/users/forgetPassword`, data);
      return res.data;
    },
    onSuccess: () => {
      navigate("/resetPassword");
    },

    onError: (err) => {
      toast.error("forget password failed :", err);
    },
  });
}
