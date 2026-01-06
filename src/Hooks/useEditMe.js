import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosconfig";
import useAuth from "../Store/useAuth";
import toast from "react-hot-toast";
function useEditMe(setIsEdit, setPreview) {
  const token = useAuth((state) => state.token);
  const setUser = useAuth((state) => state.setUser);
  async function updateMe(data) {
    const res = await api.patch("/users/updateMe", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: (result) => {
      setUser(result.data.updateUser);
      setPreview(result.data.updateUser.photo.url);
      setIsEdit(false);
      toast.success("profile is updated");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { mutate, isPending };
}

export default useEditMe;
