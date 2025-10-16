import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";

const getAdvertisementsBanner = async () => {
  const response = await axiosInstance.get("/advertisements/banner");
  return response.data;
};

const getAdvertisementsBackgrounds = async () => {
  const response = await axiosInstance.get("/advertisements/backgrounds");
  return response.data;
};

const getAdvertisementById = async (id: string) => {
  const response = await axiosInstance.get(`/advertisements/${id}`);
  return response.data;
};

export const useAdvertisementsBanner = () => {
  return useQuery({
    queryKey: ["advertisements-banner"],
    queryFn: getAdvertisementsBanner,
    staleTime: 60 * 1000,
  });
};

export const useAdvertisementsBackgrounds = () => {
  return useQuery({
    queryKey: ["advertisements-backgrounds"],
    queryFn: getAdvertisementsBackgrounds,
    staleTime: 60 * 1000,
  });
};

export const useAdvertisementById = (id: string) => {
  return useQuery({
    queryKey: ["advertisement-by-id", id],
    queryFn: () => getAdvertisementById(id),
    staleTime: 60 * 1000,
  });
};
