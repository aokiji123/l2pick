import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api";
import { ChangeUserPassword } from "../types/user";

const uploadUserAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axiosInstance.post("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const changeUserPassword = async (data: ChangeUserPassword) => {
  const response = await axiosInstance.post("/user/change-password", data, {
    data,
  });
  return response.data;
};

export const useUploadUserAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
  });
};

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: changeUserPassword,
  });
};
