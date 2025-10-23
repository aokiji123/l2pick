import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { AdvertisementResponse } from "../types/advertisement";

const getAdvertisementsBanner = async (): Promise<AdvertisementResponse> => {
  const response = await axiosInstance.get("/advertisements/banners");
  return response.data;
};

const getAdvertisementsBackground =
  async (): Promise<AdvertisementResponse> => {
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

export const useAdvertisementsBackground = () => {
  return useQuery({
    queryKey: ["advertisements-backgrounds"],
    queryFn: getAdvertisementsBackground,
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
