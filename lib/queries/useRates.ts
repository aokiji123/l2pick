import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../api";
import { RatesResponse } from "../types/rate";

const getRates = async (): Promise<RatesResponse> => {
  const response = await axiosInstance.get("/rates");
  return response.data;
};

export const useRates = (): UseQueryResult<RatesResponse> => {
  return useQuery({
    queryKey: ["rates"],
    queryFn: getRates,
  });
};
