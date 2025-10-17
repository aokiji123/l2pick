import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { ChronicleResponse } from "../types/chronicle";

const getChronicles = async (): Promise<ChronicleResponse> => {
  const response = await axiosInstance.get("/chronicles");
  return response.data;
};

export const useChronicles = () => {
  return useQuery({
    queryKey: ["chronicles"],
    queryFn: getChronicles,
  });
};
