import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { Vote } from "../types/vote";

const getUserVotes = async (): Promise<Vote[]> => {
  const response = await axiosInstance.get("/user/votes");
  return response.data;
};

const getVotesHistory = async (): Promise<Vote[]> => {
  const response = await axiosInstance.get("/votes/history");
  return response.data;
};

export const useGetUserVotes = () => {
  return useQuery({
    queryKey: ["votes", "user"],
    queryFn: getUserVotes,
    staleTime: 60 * 1000,
  });
};

export const useGetVotesHistory = () => {
  return useQuery({
    queryKey: ["votes", "history"],
    queryFn: getVotesHistory,
    staleTime: 60 * 1000,
  });
};
